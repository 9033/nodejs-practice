var express=require('express');
var Comment=require('../schemas/comment');

var router=express.Router();

router.get('/:id', function(req, res, next) {
    Comment.find({ commenter:req.params.id}).populate('commenter',{_id:1,name:1})
    .then(comments=>{
        console.log(comments);
      res.json(comments);
    })
    .catch(e=>{
      console.error(e);
      next(e);
    });
});

router.post('/', function(req, res, next) {
    const comment=new Comment({
        commenter:req.body.id,
        comment:req.body.comment,
    });
    comment.save()
    .then(res=>{
        return Comment.populate(res,{path:'commenter'});
    })
    .then(result=>{
        //console.log(result);
      res.status(201).json(result);
    })
    .catch(e=>{
      console.error(e);
      next(e);
    });
});

router.patch('/:id', function(req, res, next) {
    Comment.update({ _id:req.params.id}, { comment:req.body.comment})
    .then(result=>{
        //console.log(result);
      res.json(result);
    })
    .catch(e=>{
      console.error(e);
      next(e);
    });
});

router.delete('/:id', function(req, res, next) {
    Comment.remove( { _id:req.params.id})
    .then(result=>{
        //console.log(result);
      res.json(result);
    })
    .catch(e=>{
      console.error(e);
      next(e);
    });
});

module.exports = router;