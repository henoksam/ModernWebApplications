const ObjectId = require("mongodb").ObjectId;

const Student=require("mongoose").model("Student");

module.exports.getStudents=function(req,res){

       
    var offset= 0;
    var count= 5;
    var maxCount= 10;

    __res=(status,msg)=>res.status(status).send({message:msg});
    
    if (req.query && req.query.offset) {
         offset= parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
         count= parseInt(req.query.count);
    }

    if (isNaN(offset) || isNaN(count)) {
        __res(400,"QueryString Offset and Count should be numbers");
        return;
    }   

    if (count > maxCount) {
        __res(400,"Cannot exceed count of "+ maxCount); 
        console.log("running");    
        return;
    }

    Student.find().skip(offset).limit(count).exec(function(err,students){
        if (err) {
            __res(500,err);            
            console.log("Error finding students");           
         }else if(!students){
            __res(404,"Students not found!");            
        } else {
            console.log("Found students", students.length);
            res.status(200).send(students);
        }
    });    
}

module.exports.getAStudent=function(req,res){ 

    __res=(status,msg)=>res.status(status).send({message:msg});
     
    Student.findById(req.params.studentId).exec(function(err,student){
        if (err) {
            __res(500,err);            
            console.log("Error finding a student");           
        }else if(!student){
            __res(404,"Students not found!"); 
            console.log("Student not found ");         
        } else {
            console.log("Found a student");
            res.status(200).json(student);
        }
    });
   
}

module.exports.addAStudent=function(req,res){

    __res=(status,msg)=>res.status(status).send({message:msg});

    if(req.body && req.body.name && req.body.gpa){
        newStudent=req.body;
        Student.create({
            name:req.body.name,
            gpa:req.body.gpa,
                      

        },function(err,student){
            if(err){
                __res(201,err)
                return;
            }else{

                res.status(201).json(student);
                console.log("successfully addeded a student ", student);

            }
        });
    }
}

module.exports.updateAStudent=function(req,res){
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Student.findById(req.params.studentId).select("-reviews -publisher").exec(function(err,student){

        if(err){
            __res(500,err);
            return;           
        }

        if(!student){
            __res(400,"Student id not found");
            return;
        }

        student.name=req.body.name;
        student.gpa=req.body.gpa;

        student.save(function(err,updateStudent){
           
            if(err){
                __res(500,err);
                return;
            }
            res.status(204).json(updateStudent);
        });        

    });
}

module.exports.deleteAStudent=function(req,res){

    console.log("running delete student");
    
    __res=(status,msg)=>res.status(status).send({message:msg});
    
    Student.findByIdAndRemove(req.params.studentId).exec(function(err,deleteStudent){

        if(err){
            __res(500,err);
            return;
        }

        if(!deleteStudent){
            __res(400,"Student id not found");
            return;
        }
       
    res.status(204).json(deleteStudent);
         

    });

}
