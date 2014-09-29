var Publisher = function(){
  var topics = {},
      filter = [],
      length = 0,
      currentTopicIndex = 0
  ;

  setInterval(function(){
    console.log("Called" ,length,currentTopicIndex);
    currentTopicIndex++;
    if(currentTopicIndex >= length)currentTopicIndex = 0;
   },3001);

function subscribe(topic,content,callback){
 if(topics.hasOwnProperty(topic))return false;
  topics[topic] = {content:content,context:this,callback:callback||null};
  length++;
}


function update(topic,content){

}

function unsubscribe(topic){
  length--;

}

function publish(){
  console.log("Published "+length+" cases----------------");
  for(s in topics){
    console.log(s,s.content);
  }
}

function getOneLineTopic(i){
  i = i||currentTopicIndex;
  console.log(i);
  if(length > i){
    var cnt = 0;
    for(topic in topics){
      if(cnt == i)return topic + " : " + topics[topic].content;
      cnt++;
    }
  } 
  return "No Topics";
}


return {
  subscribe:subscribe,
  unsubscribe:unsubscribe,
  update:update,
  publish:publish,
  getOneLineTopic:getOneLineTopic,
};
}();
