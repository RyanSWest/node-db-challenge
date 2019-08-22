const express = require('express');
const db = require('../db-config');
const server = express();
const Projects = require ('./projectModel')
server.use(express.json())


const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const tasks = await db('tasks');
      res.json(tasks);
    } catch (err) {
      res.status(500).json({err: err.message, message: 'Failed to get projects' });
    }
  });


  router.post('/', (req, res) => {
    if (!req.body.description  || !req.body.project_id){
        res.status(400).json({message:'Description,  and project id are all required to add a task'})
    }else{
    db('tasks')
    .insert(req.body,'id')
    .then(task =>{
        res.status(200).json(task)
        })
    .catch(err=>{
        res.status(500).json(err)
    })
    }
      });

  module.exports = router;