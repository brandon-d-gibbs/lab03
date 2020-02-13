'use strict';

let monsters = [];
let keywordArray = [];
let dataUrl = 'data/page-1.json';

function queryData(url) {
  monsters = [];
  keywordArray= [];
  console.log('url inquerryData', url);
  $.ajax(url, {method: 'GET', dataType: 'JSON',})
    .then(data => {
      data.forEach(value => {
        // new HornMon(value).render();
        $('main').append(new HornMon(value).handlebarRender());
        // console.log('hi');
        if (!keywordArray.includes(value.keyword)){
          keywordArray.push(value.keyword);
        }
      });

      populateDropDown();
      // let x = $('section');
      // console.log('sections yo!', x);
    });

}

function HornMon(mon){
  // eslint-disable-next-line camelcase
  this.image_url = mon.image_url;
  this.title = mon.title;
  this.description = mon.description;
  this.keyword = mon.keyword;
  this.horns = mon.horns;
  monsters.push(this);
}

HornMon.prototype.render = function() {
  let template = $('#photo-template').html();

  let newSection = $('<section></section>');
  newSection.html(template);
  newSection.find('img').attr('src', this.image_url);
  newSection.find('h2').text(this.title);
  newSection.find('p').text(this.description);
  newSection.attr('keyword', this.keyword);
  newSection.attr('horns', this.horns);

  $('main').append(newSection);
};

console.log(monsters);
console.log('keywords', keywordArray);

// let filterOptions = $('select').html();

function populateDropDown() {
  let notBaseSelect = $('option').not("#baseOption");
  $(notBaseSelect).remove();


  keywordArray.forEach( word => {
    // console.log('values', word);
    let $options = $('<option></option>');
    $options.text(word);
    $options.val(word);
    $('select').append($options);
  });
}

function containsKeyword(event) {
  const sections = $('section');
  // $(sections).hide();
  // console.log(sections);
  // console.log('this', this.value);
  sections.each(function(index, value) {
    // console.log(value);
    if ( $(value).attr('keyword') === event.target.value ){
      $(value).show();
    }else {
      $(value).hide();
    }
  });
}

function changeImages(e) {
  let foo = $(e.target).attr('path');
  console.log('button url', foo);
  console.log('e target', $(e.target).attr('path'));
  let bye = $('section').not('#photo-template');
  $(bye).remove();
  queryData(foo);
}

$('select').change(containsKeyword);
$('button').on('click', changeImages);

queryData(dataUrl);

HornMon.prototype.handlebarRender = function(){
  let source = $("#entry-template").html();
  let template = Handlebars.compile(source);
  return template(this);
};







$(function() {
  console.log('ready');
});

