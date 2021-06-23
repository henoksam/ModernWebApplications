const ObjectId = require("mongodb").ObjectId;

const Student = require("mongoose").model("Student");

module.exports.getAddresses = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Student.findById(req.params.studentId)
    .select("address")
    .exec(function (err, rev) {
      if (err) {
        __res(500, err);
        console.log("Error finding address");
      } else if (!rev) {
        __res(404, "address not found!");
      } else {
        console.log("Found address", rev);
        res.status(200).json(rev);
      }
    });
};
module.exports.getAnAddress = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Student.findById(req.params.studentId)
    .select("address")
    .exec(function (err, Student) {
      const revi = Student.address.id(req.params.addressId);
      if (err) {
        __res(500, err);
        console.log("Error finding a address");
        return;
      } else if (!revi) {
        __res(404, "address not found!");
        console.log("address not found ");
        return;
      } else {
        console.log("Found a address" + revi);
        res.status(200).json(revi);
      }
    });
};

module.exports.addAnAddress = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Student.findById(req.params.studentId)
    .select("address")
    .exec(function (err, pub) {
      if (err) {
        __res(500, err);
        return;
      }

      if (!pub) {
        __res(400, "Student id not found");
        return;
      }
      console.log(req.body.address);
      console.log(pub);

      if (!Array.isArray(pub.address)) {
        pub.address = [];
      }
      pub.address.push({
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
      });
      // pub.address=[];

      pub.save(function (err, rev) {
        if (err) {
          __res(500, err);
          return;
        }
        console.log("successfully added", rev);
        res.status(204).json(rev);
      });
    });
};

module.exports.updateAnAddress = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Student.updateOne(
    { _id: req.params.studentId, "address._id": req.params.addressId },
    {
      $set: {
        "address.$.street": req.body.street,
        "address.$.zip": req.body.zip,
        "address.$.city": req.body.city,
        "address.$.country": req.body.country,
      },
    },
    function (err, Student) {
      if (err) {
        __res(500, err);
        return;
      }

      res.status(204).json(Student);
    }
  );
};

module.exports.deleteAnAddress = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Student.findById(req.params.studentId)
    .select("address")
    .exec(function (err, Student) {
      Student.address.id(req.params.addressId).remove();

      if (err) {
        __res(500, err);
        return;
      }

      if (!Student) {
        __res(400, "address id not found");
        return;
      }

      Student.save(function (err, rev) {
        if (err) {
          __res(500, err);
          return;
        }
        console.log("successfully deleted", rev);
        res.status(204).json(rev);
      });
    });
};
