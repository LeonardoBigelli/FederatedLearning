const tf = require('@tensorflow/tfjs');

const express = require("express");
const math = require('mathjs');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const { pymport, proxify } = require('pymport');
const np = proxify(pymport('numpy'));
// variabile utilizzata per debug, contatore dei dati arrivati dal client
let i = 0;

let nodo_a;
let nodo_a_layer=[]; //neuroni del primo layer
let nodo_a_arch;//archi del primo nodo
let nodo_b;
let nodo_b_layer; //neuroni del primo layer
let nodo_b_arch;
let nodo_c;
let nodo_c_layer; //neuroni del primo layer
let nodo_c_arch;
let nodo_d;
let nodo_d_layer; //neuroni del primo layer
let nodo_d_arch;

app.use(bodyParser.json({limit: "500mb", extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/nodo_a', (req, res) => {
  const data = req.body;
  nodo_a_layer = data.l1;
  nodo_a_arch = data.a;

  console.log(nodo_a_layer);

  i = i+1;
  res.sendStatus(200);
});

app.post('/nodo_b', (req, res) => {
  const data = req.body;
  nodo_b_layer = data.l1;
  nodo_b_arch = data.a;
  i = i+1;
  res.sendStatus(200);
});

app.post('/nodo_c', (req, res) => {
  const data = req.body;
  nodo_c_layer = data.l1;
  nodo_c_arch = data.a;
  i = i+1;
  res.sendStatus(200);
});

app.post('/nodo_d', (req, res) => {
  const data = req.body;
  nodo_d_layer = data.l1;
  nodo_d_arch = data.a;
  i = i+1;
  res.sendStatus(200);
});

app.get('/pesi', (req, res) => {
	if(i != 4){
		res.sendStatus(400);
	}else{
		arr_all_weight_layer_1 = [];
    	arr_all_weight_layer_1 = [nodo_a_layer, nodo_b_layer, nodo_c_layer, nodo_d_layer];
    	//neuroni del primo layer, media gia' calcolata
    	nodo0 = (parseFloat(nodo_a_layer[0]) + parseFloat(nodo_b_layer[0]) + parseFloat(nodo_c_layer[0]) + parseFloat(nodo_d_layer[0]))/4;
    	nodo1 = (parseFloat(nodo_a_layer[1]) + parseFloat(nodo_b_layer[1]) + parseFloat(nodo_c_layer[1]) + parseFloat(nodo_d_layer[1]))/4;
    	nodo2 = (parseFloat(nodo_a_layer[2]) + parseFloat(nodo_b_layer[2]) + parseFloat(nodo_c_layer[2]) + parseFloat(nodo_d_layer[2]))/4;
    	
    	// archi del primo layer, media gia' calcolata
    	arco0 = (parseFloat(nodo_a_arch[0]) + parseFloat(nodo_b_arch[0]) + parseFloat(nodo_c_arch[0]) + parseFloat(nodo_d_arch[0]))/4;
    	arco1 = (parseFloat(nodo_a_arch[1]) + parseFloat(nodo_b_arch[1]) + parseFloat(nodo_c_arch[1]) + parseFloat(nodo_d_arch[1]))/4;
    	arco2 = (parseFloat(nodo_a_arch[2]) + parseFloat(nodo_b_arch[2]) + parseFloat(nodo_c_arch[2]) + parseFloat(nodo_d_arch[2]))/4;
    	
    	i = 0;
    	result = [];
    	console.log(arco2);
    	result.push({"l1":[[nodo0],[nodo1],[nodo2]],"a":[[arco0],[arco1],[arco2]]});
    	
		res.contentType('application/json');
		res.send(JSON.stringify(result[0]));

	}
    
  
});

app.get('/ping', (req, res) => {
  res.sendStatus(200);
});

app.listen(3001, () => console.log("Server operativo sulla porta 3001"));
