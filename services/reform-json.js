

exports.JsonReform = (request) =>{
  if ( request == null ){
      return {}
  }
  let payload = request
  let obj = []
  let objSaveID = []
  let chainParentWithChild = {}
    for (const key in payload) {
        const objects = payload[key]

        for (const o in objects) {
            data = objects[o]
            objSaveID.push(data.id)
            obj.push(data)
            if(chainParentWithChild[data.parent_id] == null) {
                if (data.parent_id !== null ) {
                    (chainParentWithChild[data.parent_id] = [] || chainParentWithChild[data.parent_id]).push(data.id)
                } else {
                    chainParentWithChild[data.id] = []

                }
            } else {
                chainParentWithChild[data.parent_id].push(data.id)
            }
            
            
        }
    }

    
    for (let index = 0; index < obj.length; index++) {
        const element = obj[index];
        let indexAssign = objSaveID.indexOf(element.parent_id)
        if(indexAssign >= 0){
            obj[indexAssign].children.push({...obj[index]})
    
        }
        
    }
    
    obj = obj.filter(({parent_id}) => parent_id == null)

    return obj




}