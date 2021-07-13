const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click',completeTask)
})

async function completeTask () {
    const task = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('completeTask',{
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'jobName' : 'task'
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}