const db = require('../db-config')



module.exports = {
    add,
    find,
    findTasks,
    findTasks,
    // update,
    findResources
     
    
    

}

function find(){
    return db('projects')
}

async function add (project){
    const [id]= await db('projects').insert(project);
    return findById(id)
}

function findTasks(project_id){
    console.log('$$$',project_id)
    return db('tasks as t')
    .join('projects as p', 'p.id', 't.project_id')
    .select('p.name', 't.description')
    .where( 'p.id', project_id)
 }



 function findById(id){
    return db('projects')
    .where({id})
    .first();
}
function findResources(project_id){
    console.log(project_id, "777")
    return db('resources as r')
    .join('projects as p', 'p.id', 'r.project_id')
    .select('p.name', 'r.name','r.description')
    .where('p,id', project_id)
 
}

