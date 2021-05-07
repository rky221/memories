const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = 5000 || process.env.PORT;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      const imgDateTime = Date().toString().split(" GMT")[0].split(" ").join("").split(':').join().split(",").join("");
      cb(null,  imgDateTime + file.originalname);
    },
  });
   
const upload = multer({ storage: storage,
    fileFilter: function (req, file, cb) {
            const extn = path.extname(file.originalname);
            if (extn !== '.png' && extn !== '.jpg' && extn !== '.gif' && extn !== '.jpeg' && extn !== '.svg') {
              return cb(new Error('File uploaded is not an image!'));
            }
            cb(null, true);
          },
      limits: {
          files: 1,
          fileSize: 1024*1024*5,
      }
});

const quotesData = [ {author: 'J.M. Barrie' , quote: 'God gave us memory so that we might have roses in December.'},
                     {author:'Edgar Allan Poe', quote: 'To observe attentively is to remember distinctly'},
                     {author: 'Edgar Allan Poe', quote: 'If you wish to forget anything on the spot, make a note that this thing is to be remembered.'},
                     {author: 'Vladimir Nabokov', quote:'I think it is all a matter of love, the more you love a memory the stronger and stranger it becomes'},
                    ];

const aboutMe = {info: "A platform to share memories with friends and family."};


const memorySchema = mongoose.Schema({
        title: String,
        creator: String,
        tags: String,
        message:String,
        imgPath:String,
        likeCount: {
            type: Number,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedCount: {
            type: Number,
            default: 0,
        }
});

const MemoriesData = mongoose.model('Memory', memorySchema);
const CONNECTION_URL = 'mongodb://localhost:27017/memoriesDB';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

app.get('/', async function (req, res) {
    const memories = await MemoriesData.find({});
    res.render('index', {memories: memories, quotesData: quotesData, aboutMe: aboutMe}); 
});

app.post('/', upload.single('memory-image'), async function (req, res) {
    let newMemory;
    if(req.file){
        newMemory = new MemoriesData({...req.body, imgPath: "uploads/"+req.file.filename});
    }
    else {
        newMemory = new MemoriesData({...req.body, imgPath: "uploads/default-img.jpg"});
    }
    await newMemory.save();
    res.redirect('/');
});

app.post('/like', async function (req, res) {
    const searched = await MemoriesData.findOne({_id: req.body.likeId});
    await MemoriesData.updateOne({ _id: req.body.likeId}, {likeCount: searched.likeCount+1});
    res.redirect('/'); 
});

app.post('/update', upload.single('memory-image'), async function (req, res) {
    const searchedMemory = await MemoriesData.findOne({_id: req.body.updateId});
    if(req.file)
    {
        fs.promises.unlink('./public/'+searchedMemory.imgPath);
        await MemoriesData.updateOne({ _id: req.body.updateId}, {...req.body, createdAt: Date.now(), updatedCount: searchedMemory.updatedCount+1, imgPath: "uploads/"+req.file.filename});
    }
    await MemoriesData.updateOne({ _id: req.body.updateId}, {...req.body, createdAt: Date.now(), updatedCount: searchedMemory.updatedCount+1});
    res.redirect('/'); 
});

app.post('/delete', async function (req, res) {
    const searchImgPath = await MemoriesData.findOne({_id: req.body.deleteId});
    if(searchImgPath.imgPath!=="uploads/default-img.jpg")
    {
        fs.promises.unlink('./public/'+searchImgPath.imgPath);
    }    
    await MemoriesData.deleteOne({_id: req.body.deleteId});
    res.redirect('/');
});

app.listen(PORT, function() {
    console.log(`Server hosted at localhost:${PORT}`);
});