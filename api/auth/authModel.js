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
    return db(`${table} as u `)
    .select('u.id', 'u.username', 'ur.role')
    .join('user_roles as ur','ur.id','u.role_id')
}
function findById(id){
     id =  Array.isArray(id) ? [id]:id
    return db(`${table} as u `)
    .select('u.id', 'u.username', 'ur.role')
    .join('user_roles as ur','ur.id','u.role_id')
    .where('u.id','=',id)
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
