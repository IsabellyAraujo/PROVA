//lendo extensões
var fs = require('fs');
var file = process.argv[2];
var extensao = file.split('.')[file.split('.').length-1]
var lista;
function json()
{
  lista = require('./lista.json');
  lista = lista.valores;
  processar_intervalo();
}
function csv()
{
  var csv = require('csv-string');
  var res;
  fs.readFile(file, 'utf8', function(err, data)  {
    res = csv.parse(data);
    lista  = res[0];
    processar_intervalo();
  });
}
function xml()
{
  var xmlParser = require('xml2js').parseString;
    fs.readFile(file, function(err, data) {
        xmlParser(data, function(err, result)
          {
            lista = result.valores.split(',');
            processar_intervalo();
          });
    });
}
if(extensao == 'json')
  json();
if(extensao == 'csv')
  csv();
if(extensao == 'xml')
  xml();
//pegando os intervalos
function processar_intervalo()
{
    if(lista.length == 0 )
  {
    console.log("Tente Novamente mais tarde.");
    process.exit(-1);
  }
  else{
    var posicoes = [];
    var posicoes_int = [];
    var inicio = lista[0];
    var final = [];
    var resultado = "";
    for(var a = 0; a < lista.length;  a++)
    {
      if(lista[a + 1] - lista[a] != 1)
      {
        fim = lista[a];
        if(fim == inicio)
        {
          resultado += "[" + inicio + "]";
        }
        else {
          resultado += "[" + inicio + "-" + fim + "] ";
        }
        inicio = lista[a+1];
      }
    }
    console.log(resultado);
    fs.writeFile('resultado.json', JSON.stringify(resultado), function (err) {
    if (err) throw err;
    console.log('Arquivo gravado com sucesso!');
    });
  
  } 
}
