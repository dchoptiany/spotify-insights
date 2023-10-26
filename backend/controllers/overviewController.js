exports.sendResponce = async (req, res) =>{
    try{
        res.status(200).json({
            status: 'success'
        });
    }
    catch(err){
        res.status(400).json({
            status: 'failed'
        })
    }
}