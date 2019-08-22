const express = require('express');
const db = require('../db-config');
const server = express();
const Projects = require ('./projectModel')
server.use(express.json())


const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const projects = await db('projects');
      res.json(projects);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get projects' });
    }
  });



// router.get('/', async (req, res) => {
//     try {
//       const projects = await db('projects')
//       res.status(200).json(projects)
//     } catch (err) {
//       console.log(err)
//       res.status(500).json({
//         message: 'Error getting projects 💩', error: err
//       })
//     }
//   })

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const [project] = await db('projects')
        .where({ id })
      if (project) {
        res.status(200).json(project)
      } else {
        res.status(404).json({
          message: 'Could not find the specified food item in database 🤷‍'
        })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Error retrieving the requested info from database ', error: err
      })
    }
  })

router.get('/:id/tasks', async(req,res)=>{
    const {id}=req.params;

    try{
        const tasks = await Projects.findTasks(id)
     console.log(tasks)
    if (tasks){
        res.status(201).json(tasks);
    }else{
        res.status(404).json({message: 'could not find tasks'});
    }
}catch (err){
    console.log(err)
    res.status(500).json({message: 'failed to get tasks'})
}
})

router.get(':id/resources', async (req,res)=> {
    const {id} = req.params;

    try{
        const resources = await Projects.findResources(id)
        console.log(resources)
          
    if (resources){
        res.status(201).json(resources);
    }else{
        res.status(404).json({message: 'could not find resources'});
    }
}catch (err){
    res.status(500).json({message: 'failed to get resources'})
    }
})



//   router.post('/', async (req, res) => {
//     const projectData = req.body;
  
//     try {
//       const project = await Projects.add(projectData);
//       res.status(201).json(project);
//     } catch (err) {
//       res.status(500).json({ message: 'Failed to create new Project' });
//     }
//   });

router.post('/', async(req,res) => {
    try{
    const projects = req.body;
    const [id]= await db('projects').insert(projects)
    res.status(201).json(projects);

}catch(err){
    console.log('Post error: ', err);
    res.status(500).json({message: 'Failed'})
}

});

 

module.exports = router;