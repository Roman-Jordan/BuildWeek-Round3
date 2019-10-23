const db = require(dbConfig)
module.exports={
    findAll,
    findById,
    remove,
    add,
    editById,
    findByUserName
}
const table='users'
function findAll(){
    return db(`${table} as u`)
    .select('user_roles as ur')
    .join('roles as r', 'ur.user_id', '=' ,'u.id')
  
    
    // .where({user_id: u.id})

}
function findById(id){
     id =  Array.isArray(id) ? [id]:id
    return db(table)
    .select('id','username')
    .where({id})
    .first()
}


function findByUserName(username){
    return db(table)
    .where({username})
    .first()
}
function remove(id) {
    return db(table)
    .where({id})
    .del()
}
function editById(id,update){
    return db(table)
    .where({ id })
    .update(update, '*');
}
function add(obj){
    return db(table)
    .insert(obj,'id')
    .then(([id])=>findById(id))
}
