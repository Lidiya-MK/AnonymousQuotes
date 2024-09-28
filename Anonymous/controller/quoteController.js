const Quote= require('../model/Quote');


exports.createQuote= async(req,res)=>{
    try{
        const quote= new Quote(req.body);
        await quote.save();
        res.status(201).send(quote)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}


exports.getAllQuotes= async(req,res)=>{
    try{
        const quotes= await Quote.find()
        res.status(200).send(quotes)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}


exports.getQuote= async(req,res)=>{
    try{
        const quote= await Quote.findById(req.params.id)
        if (!quote){return res.status(400).send("Unable to get quote")}
        res.status(200).send(quote)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}


exports.updateLike= async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });

       
        quote.likes = quote.likes + (req.body.likes || 1);
        await quote.save();
        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ message: 'Error updating likes', error });
    }
}

exports.updateFlag = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        quote.flags += req.body.flags !== undefined ? req.body.flags : 1;
        if (quote.flags >= 5 && quote.likes < 10) {
            await quote.deleteOne();
            return res.status(200).json({ message: 'Quote has been deleted due to flags' });
        }

        await quote.save();
        return res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ message: 'Error updating flags', error });
    }
};

