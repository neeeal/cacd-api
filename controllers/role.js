const RolesCol = require("../models/roles.js");
const utils = require("../helpers/utils.js");
const moment = require("moment");

exports.get = async (req, res) => {
  const queryParams = req.query || {};

  const query = utils.queryBuilder({
    initialQuery: { deletedAt: null },
    queryParams: queryParams,
  });

  let data;
  try{
    data = await utils.getAndPopulate({
      query: query,
      col: RolesCol,
      offset: queryParams.offset,
      limit: queryParams.limit
    });
  } catch (err) {
    console.error(err.stack);
    return res.status(500).send({ error: "Server error" });
  }

  res.status(200).send({
    message: "get all active roles",
    data: data || [],
    count: data && data.length
  })
}

exports.post = async (req, res) => {
  let newRole = req.body;

  console.log(newRole)

  let newRoleDoc;
  try{
    newRoleDoc = new RolesCol(newRole);
    const savedDoc = await newRoleDoc.save();
  } catch (err) {
    console.error(err.stack);

    // Handle "Permission not found" error
    if (err.message.includes("not found")) {
      return res.status(404).send({ error: err.message });
    }

    // Handle invalid Object ID error
    if (err.message.includes("Cast to ObjectId failed")) {
      return res.status(400).send({ message: "Invalid Object ID" });
    }

    // Handle duplicate key error (MongoServerError with code 11000)
    if (err.code === 11000) {
      return res.status(400).send({
        error: `Duplicate key error. A ROLE with this ${Object.keys(err.keyValue).join(', ')} already exists.`,
      });
    }

    // General server error
    return res.status(500).send({ error: "Server error" });
  }

  res.status(200).send({
    message: "post",
    data: newRoleDoc
  });
};

exports.put = async (req, res) => {
  let newRole = req.body;

  const query = {
    _id: newRole.OID,
    deletedAt: null
  };

  const values = {
    $set: {
      ...newRole
    }
  };

  const options = { new: true };

  try{
    newRole = await utils.updateAndPopulate({ query: query, values: values, options: options, col: RolesCol });

    if (!newRole) 
      throw new Error("Role not found");

  } catch (err) {
    console.error(err.stack);

    // Handle "Permission not found" error
    if (err.message.includes("not found")) {
      return res.status(404).send({ error: err.message });
    }

    // Handle invalid Object ID error
    if (err.message.includes("Cast to ObjectId failed")) {
      return res.status(400).send({ message: "Invalid Object ID" });
    }

    // Handle duplicate key error (MongoServerError with code 11000)
    if (err.code === 11000) {
      return res.status(400).send({
        error: `Duplicate key error. A permission with this ${Object.keys(err.keyValue).join(', ')} already exists.`,
      });
    }

    // General server error
    return res.status(500).send({ error: "Server error" });
  }

  res.status(200).send({
    message: "put",
    data: newRole
  })
};

exports.delete = async (req, res) => {
  
  const { OID } = req.params; 

  let newRole;
  try {
    newRole = await RolesCol.findOneAndUpdate(
      { 
        _id: OID, 
        deletedAt: null
      },
      {
        $set: {
          deletedAt: moment().toISOString()
        }
    }
  );
  } catch (err){
    console.error(err.stack);
    return res.status(500).send({ error: "Server error" });
  }

  if (!newRole) {
    return res.status(404).send({ error: "Role not found" });
  }

  res.status(200).send({
    message: "get",
    data: newRole
  })
};