export default (app)=>{
	/* GET home page. */
	app.get('/', (req, res, next)=>{
	  res.render('index', { title: 'Express' })
	})
};