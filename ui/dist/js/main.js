(function(e){function t(t){for(var n,i,o=t[0],u=t[1],a=t[2],d=0,b=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(c,i)&&c[i]&&b.push(c[i][0]),c[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);l&&l(t);while(b.length)b.shift()();return s.push.apply(s,a||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,o=1;o<r.length;o++){var u=r[o];0!==c[u]&&(n=!1)}n&&(s.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},c={app:0},s=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=t,o=o.slice();for(var a=0;a<o.length;a++)t(o[a]);var l=u;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"0aab":function(e,t,r){"use strict";r("1f6b")},"1aa0":function(e,t,r){"use strict";r("a12e")},"1f6b":function(e,t,r){},"2d96":function(e,t,r){},"31fd":function(e,t,r){"use strict";r("39b8")},"39b8":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);var n={};r.r(n),r.d(n,"get",(function(){return M})),r.d(n,"post",(function(){return T})),r.d(n,"scheduler",(function(){return I})),r.d(n,"http_get",(function(){return F})),r.d(n,"http_post",(function(){return E})),r.d(n,"countdown",(function(){return N})),r.d(n,"process_time",(function(){return R})),r.d(n,"time_str",(function(){return D}));r("e260"),r("e6cf"),r("cca6"),r("a79d");var c=r("7a23"),s={class:"post-col",id:"review"},i=Object(c["e"])(" Review "),o={key:0,class:"notif"},u={key:1,class:"refresh-timer"},a=Object(c["f"])("hr",{class:"solid"},null,-1),l={class:"review-container"},d={key:0},b={key:1},f={style:{color:"red"}},_={class:"post-col",id:"study"},O=Object(c["e"])(" Study "),j={key:0,class:"notif"},p={key:1,class:"refresh-timer"},v=Object(c["f"])("hr",{class:"solid"},null,-1),g={class:"study-container"},y={key:0},m={key:1},h={style:{color:"red"}},w={class:"post-col",id:"decks"},k=Object(c["f"])("h1",null,"Decks",-1),x=Object(c["f"])("hr",{class:"solid"},null,-1),q={class:"row-2"};function S(e,t,r,n,S,C){var P=Object(c["k"])("review"),M=Object(c["k"])("study"),T=Object(c["k"])("deck");return Object(c["g"])(),Object(c["c"])(c["a"],null,[Object(c["f"])("div",s,[Object(c["f"])("h1",null,[i,S.review_error_msg?Object(c["d"])("",!0):(Object(c["g"])(),Object(c["c"])("sup",o,Object(c["l"])(S.review_total),1)),S.review_error_msg?(Object(c["g"])(),Object(c["c"])("span",u,"(in "+Object(c["l"])(S.review_freq_time)+"s)",1)):Object(c["d"])("",!0)]),a,Object(c["f"])("div",l,[S.review_error_msg?Object(c["d"])("",!0):(Object(c["g"])(),Object(c["c"])("div",d,[Object(c["f"])(P,{review_card:S.review_card,onReviewPost:C.handle_review_post},null,8,["review_card","onReviewPost"])])),S.review_error_msg?(Object(c["g"])(),Object(c["c"])("div",b,[Object(c["f"])("span",f,[Object(c["f"])("i",null,Object(c["l"])(S.review_error_msg),1)])])):Object(c["d"])("",!0)])]),Object(c["f"])("div",_,[Object(c["f"])("h1",null,[O,S.study_error_msg?Object(c["d"])("",!0):(Object(c["g"])(),Object(c["c"])("sup",j,Object(c["l"])(S.study_total),1)),S.study_error_msg?(Object(c["g"])(),Object(c["c"])("span",p,"(in "+Object(c["l"])(S.study_freq_time)+"s)",1)):Object(c["d"])("",!0)]),v,Object(c["f"])("div",g,[S.study_error_msg?Object(c["d"])("",!0):(Object(c["g"])(),Object(c["c"])("div",y,[Object(c["f"])(M,{study_card:S.study_card,onStudyPost:C.handle_study_post,onStudyNext:C.handle_study_next},null,8,["study_card","onStudyPost","onStudyNext"])])),S.study_error_msg?(Object(c["g"])(),Object(c["c"])("div",m,[Object(c["f"])("span",h,[Object(c["f"])("i",null,Object(c["l"])(S.study_error_msg),1)])])):Object(c["d"])("",!0)])]),Object(c["f"])("div",w,[k,x,Object(c["f"])("div",q,[(Object(c["g"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(S.decks,(function(e){return Object(c["g"])(),Object(c["c"])(T,{deck:e,key:e.id},null,8,["deck"])})),128))])])],64)}r("159b");var C={api_url:"https://mem.smgr.io"},P=r("3835");r("d3b7"),r("3ca3"),r("ddb0"),r("fb6a");function M(e){return fetch(e,{method:"GET"}).then((function(e){return Promise.all([e,e.json()])})).then((function(e){var t=Object(P["a"])(e,2),r=t[0],n=t[1];if(r.ok)return n;throw null!=n.message?Error(n.message):Error(r.statusText)})).then((function(e){return e})).catch((function(e){return e.message}))}function T(e,t){return fetch(e,{method:"POST",body:JSON.stringify(t),credentials:"same-origin",headers:{"Content-Type":"application/json"}}).then((function(e){return Promise.all([e,e.json()])})).then((function(e){var t=Object(P["a"])(e,2),r=t[0],n=t[1];if(r.ok)return n;throw null!=n.message?Error(n.message):Error(r.statusText)})).then((function(e){return e})).catch((function(e){return e.message}))}function I(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1,n=M(e).then((function(e){return t(e)}));return r>0&&setTimeout((function(){return I(e,t,r)}),r),n}function F(e,t){return M(e).then((function(e){return t(e)}))}function E(e,t,r){return T(e,t).then((function(e){return r(e)}))}function N(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(e){return e<=0},c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1e3;null!=t&&clearInterval(t),null!=r&&r(e);var s=setInterval((function(){e-=c/1e3,null!=n&&n(e)?clearInterval(s):null!=r&&r(e)}),c);return s}function R(e){var t=e/1e3,r=Math.floor(t/60/60/24);t-=24*r*60*60;var n=Math.floor(t/60/60);t-=60*n*60;var c=Math.floor(t/60);return t-=60*c,[r,n,c,t]}function D(e){var t=R(e),r="";return r+=0!=t[0]?t[0]+" days, ":"",r+=0!=t[1]?t[1]+" hours, ":"",r+=0!=t[2]?t[2]+" minutes, ":"",r+=0!=t[3]?t[3]+" seconds":"",", "==r.slice(-2)&&(r=r.slice(0,-2)),r}var H=Object(c["q"])("data-v-2b37563c");Object(c["i"])("data-v-2b37563c");var L={key:0,class:"row review-input"},V={key:1,class:"row-2 review-answer"},$={key:0,class:"review-answer-query"},z=Object(c["f"])("span",{class:"grey"},[Object(c["f"])("i",null,"Submitted answer")],-1),A=Object(c["f"])("hr",{class:"solid"},null,-1),J={style:{margin:"0"}},K={class:"review-answer-feedback"},Q=Object(c["f"])("span",{class:"grey"},[Object(c["f"])("i",null,"Feedback")],-1),U=Object(c["f"])("hr",{class:"solid"},null,-1),B=Object(c["f"])("span",{class:"grey"},[Object(c["f"])("i",null," - perfect response")],-1),G=Object(c["f"])("br",null,null,-1),W=Object(c["f"])("span",{class:"grey"},[Object(c["f"])("i",null," - correct response after hesitation")],-1),X=Object(c["f"])("br",null,null,-1),Y=Object(c["f"])("span",{class:"grey"},[Object(c["f"])("i",null," - correct response recalled with difficulty")],-1),Z=Object(c["f"])("br",null,null,-1),ee=Object(c["f"])("span",{class:"grey"},[Object(c["f"])("i",null," - incorrect response; correct one easy to recall")],-1),te=Object(c["f"])("br",null,null,-1),re=Object(c["f"])("span",{class:"grey"},[Object(c["f"])("i",null," - incorrect response; correct one remembered")],-1),ne=Object(c["f"])("br",null,null,-1),ce=Object(c["f"])("span",{class:"grey"},[Object(c["f"])("i",null," - complete blackout")],-1);Object(c["h"])();var se=H((function(e,t,r,n,s,i){var o=Object(c["k"])("card-question"),u=Object(c["k"])("card-answer");return Object(c["g"])(),Object(c["c"])(c["a"],null,[Object(c["f"])(o,{card:r.review_card},null,8,["card"]),s.toggle_input?(Object(c["g"])(),Object(c["c"])("div",L,[Object(c["n"])(Object(c["f"])("textarea",{"onUpdate:modelValue":t[1]||(t[1]=function(e){return s.submitted_answer=e}),placeholder:"Optional answer",onKeyup:t[2]||(t[2]=Object(c["o"])(Object(c["p"])((function(){return i.submit_response&&i.submit_response.apply(i,arguments)}),["exact"]),["enter"]))},null,544),[[c["m"],s.submitted_answer]]),Object(c["f"])("button",{onClick:t[3]||(t[3]=function(){return i.submit_response&&i.submit_response.apply(i,arguments)}),style:{"font-size":"11.5px"}},"View answer")])):Object(c["d"])("",!0),s.toggle_answer?(Object(c["g"])(),Object(c["c"])("div",V,[Object(c["f"])("div",null,[Object(c["f"])("div",null,[Object(c["f"])(u,{card:r.review_card},null,8,["card"])]),s.submitted_answer?(Object(c["g"])(),Object(c["c"])("div",$,[z,A,Object(c["f"])("h2",J,Object(c["l"])(s.submitted_answer),1)])):Object(c["d"])("",!0)]),Object(c["f"])("div",K,[Q,U,Object(c["f"])("button",{style:{background:"#2ECC40"},onClick:t[4]||(t[4]=function(e){return i.post_feedback(5)})},"5"),B,G,Object(c["f"])("button",{style:{background:"#3D9970"},onClick:t[5]||(t[5]=function(e){return i.post_feedback(4)})},"4"),W,X,Object(c["f"])("button",{style:{background:"#FFDC00"},onClick:t[6]||(t[6]=function(e){return i.post_feedback(3)})},"3"),Y,Z,Object(c["f"])("button",{style:{background:"#FF851B"},onClick:t[7]||(t[7]=function(e){return i.post_feedback(2)})},"2"),ee,te,Object(c["f"])("button",{style:{background:"#FF4136"},onClick:t[8]||(t[8]=function(e){return i.post_feedback(1)})},"1"),re,ne,Object(c["f"])("button",{style:{background:"#111111",color:"white"},onClick:t[9]||(t[9]=function(e){return i.post_feedback(0)})},"0"),ce])])):Object(c["d"])("",!0)],64)})),ie=C.api_url,oe={methods:n},ue={name:"Review",mixins:[oe],props:{review_card:{required:!0,type:Object}},data:function(){return{submitted_answer:"",toggle_input:!0,toggle_answer:!1}},methods:{submit_response:function(){this.toggle_input=!1,this.toggle_answer=!0},post_feedback:function(e){var t=this;return this.http_post(ie+"/post_feedback",{card_id:this.review_card.id,q:e,text:this.submitted_answer},(function(){t.$emit("review-post"),t.toggle_input=!0,t.toggle_answer=!1,t.submitted_answer=""}))}}};r("1aa0");ue.render=se,ue.__scopeId="data-v-2b37563c";var ae=ue,le=Object(c["q"])("data-v-6d217a6c");Object(c["i"])("data-v-6d217a6c");var de={key:0,class:"row study-input"},be={key:1,class:"col study-answer"},fe={class:"row-2"},_e={key:0,class:"study-answer-query"},Oe=Object(c["f"])("span",{class:"grey"},[Object(c["f"])("i",null,"Submitted answer")],-1),je=Object(c["f"])("hr",{class:"solid"},null,-1),pe={style:{margin:"0"}};Object(c["h"])();var ve=le((function(e,t,r,n,s,i){var o=Object(c["k"])("card-question"),u=Object(c["k"])("card-answer");return Object(c["g"])(),Object(c["c"])(c["a"],null,[Object(c["f"])(o,{card:r.study_card},null,8,["card"]),s.toggle_input?(Object(c["g"])(),Object(c["c"])("div",de,[Object(c["n"])(Object(c["f"])("textarea",{"onUpdate:modelValue":t[1]||(t[1]=function(e){return s.submitted_answer=e}),placeholder:"Optional answer",onKeyup:t[2]||(t[2]=Object(c["o"])(Object(c["p"])((function(){return i.submit_response&&i.submit_response.apply(i,arguments)}),["exact"]),["enter"]))},null,544),[[c["m"],s.submitted_answer]]),Object(c["f"])("button",{onClick:t[3]||(t[3]=function(){return i.submit_response&&i.submit_response.apply(i,arguments)}),style:{"font-size":"11.5px"}},"View answer")])):Object(c["d"])("",!0),s.toggle_answer?(Object(c["g"])(),Object(c["c"])("div",be,[Object(c["f"])("div",fe,[Object(c["f"])("div",null,[Object(c["f"])(u,{card:r.study_card},null,8,["card"])]),s.submitted_answer?(Object(c["g"])(),Object(c["c"])("div",_e,[Oe,je,Object(c["f"])("h2",pe,Object(c["l"])(s.submitted_answer),1)])):Object(c["d"])("",!0)]),Object(c["f"])("button",{onClick:t[4]||(t[4]=function(){return i.study_next&&i.study_next.apply(i,arguments)}),style:{"font-size":"11.5px"}},"Next card")])):Object(c["d"])("",!0)],64)})),ge=C.api_url,ye={methods:n},me={name:"Study",mixins:[ye],props:{study_card:{required:!0,type:Object}},data:function(){return{submitted_answer:"",toggle_input:!0,toggle_answer:!1}},methods:{submit_response:function(){var e=this;return this.toggle_input=!1,this.toggle_answer=!0,this.http_post(ge+"/post_study",{card_id:this.study_card.id},(function(){e.$emit("study-post")}))},study_next:function(){this.$emit("study-next"),this.toggle_input=!0,this.toggle_answer=!1,this.submitted_answer=""}}};r("aa3d");me.render=ve,me.__scopeId="data-v-6d217a6c";var he=me,we=(r("b0c0"),Object(c["q"])("data-v-c14d247e"));Object(c["i"])("data-v-c14d247e");var ke={class:"tight-box"},xe={key:0,class:"grey desc"};Object(c["h"])();var qe=we((function(e,t,r,n,s,i){return Object(c["g"])(),Object(c["c"])("div",null,[Object(c["f"])("span",ke,Object(c["l"])(r.deck.card_count)+" cards",1),Object(c["f"])("h2",null,Object(c["l"])(r.deck.name),1),r.deck.desc?(Object(c["g"])(),Object(c["c"])("div",xe,[Object(c["f"])("i",null,Object(c["l"])(r.deck.desc),1)])):Object(c["d"])("",!0)])})),Se={props:{deck:{required:!0,type:Object}}};r("31fd");Se.render=qe,Se.__scopeId="data-v-c14d247e";var Ce=Se;console.log(C);var Pe=C.api_url;console.log(Pe);var Me={methods:n},Te={name:"App",mixins:[Me],components:{Review:ae,Study:he,Deck:Ce},data:function(){return{decks:[],deck_index:{},poll_freq:30,review_card:{deck:{},html:{}},review_error_msg:"",review_total:0,review_timer:null,review_freq_timer:null,review_freq_time:0,study_card:{deck:{},html:{}},study_error_msg:"",study_total:0,study_freq_timer:null,study_freq_time:0}},methods:{get_decks:function(){var e=this;return this.http_get(Pe+"/list_decks",(function(t){e.decks=t,t.forEach((function(t){e.deck_index[t.id]=t}))}))},get_review_card:function(){var e=this;return this.http_get(Pe+"/review",(function(t){if(console.log(t),null!=t.card)e.review_card=t.card,e.review_error_msg="",e.review_total=t.stats.total,console.log("non-null card");else if(e.review_card={},e.review_error_msg=t.msg,t.time_remaining){var r=parseInt(t.time_remaining);e.review_timer=e.countdown(r,e.review_timer,(function(t){var r=e.time_str(1e3*t);e.review_error_msg="No cards to review. Next review in "+r+"."}),(function(t){return t<=0||!e.review_error_msg})),e.review_freq_timer=e.countdown(e.poll_freq,e.review_freq_timer,(function(t){e.review_freq_time=t}),(function(t){return!e.review_error_msg||t<=0&&(e.get_review_card(),!0)}),1e3)}}))},get_study_card:function(){var e=this;return this.http_get(Pe+"/study",(function(t){null!=t.card?(e.study_card=t.card,e.study_error_msg="",e.study_total=t.stats.total):(e.study_card={},e.study_error_msg=t.msg,e.study_freq_timer=e.countdown(e.poll_freq,e.study_freq_timer,(function(t){e.study_freq_time=t}),(function(t){return(t<=0||!e.study_error_msg)&&(e.get_study_card(),!0)})))}))},handle_review_post:function(){this.get_decks(),this.get_review_card()},handle_study_post:function(){this.get_decks(),this.get_review_card()},handle_study_next:function(){this.get_study_card()}},mounted:function(){this.get_decks(),this.get_review_card(),this.get_study_card()}};r("d158");Te.render=S;var Ie=Te,Fe=Object(c["q"])("data-v-6f8eff6b");Object(c["i"])("data-v-6f8eff6b");var Ee=Object(c["f"])("span",{class:"grey"},[Object(c["f"])("i",null,"Answer(s)")],-1),Ne=Object(c["f"])("hr",{class:"solid"},null,-1);Object(c["h"])();var Re=Fe((function(e,t,r,n,s,i){return Object(c["g"])(),Object(c["c"])(c["a"],null,[Ee,Ne,Object(c["f"])("div",{innerHTML:r.card.html.answers,class:"a-text"},null,8,["innerHTML"])],64)})),De=(r("a15b"),{props:{card:{required:!0,type:Object}},computed:{answer:function(){return this.card.answers.join(", ")}}});r("b5eb");De.render=Re,De.__scopeId="data-v-6f8eff6b";var He=De,Le=Object(c["q"])("data-v-2df34594");Object(c["i"])("data-v-2df34594");var Ve={class:"grey"},$e=Object(c["e"])("Question "),ze={class:"tight-box"},Ae={class:"tight-box"},Je={class:"tight-box"},Ke=Object(c["f"])("hr",{class:"solid"},null,-1);Object(c["h"])();var Qe=Le((function(e,t,r,n,s,i){return Object(c["g"])(),Object(c["c"])(c["a"],null,[Object(c["f"])("span",Ve,[Object(c["f"])("i",null,[$e,Object(c["f"])("span",ze,"id: "+Object(c["l"])(r.card.id),1),Object(c["f"])("span",Ae,"deck: "+Object(c["l"])(r.card.deck.name),1),Object(c["f"])("span",Je,"correct: "+Object(c["l"])(i.percent_correct)+"%",1)])]),Ke,Object(c["f"])("div",{innerHTML:r.card.html.question,class:"q-text"},null,8,["innerHTML"])],64)})),Ue=(r("b680"),{props:{card:{required:!0,type:Object}},computed:{percent_correct:function(){return 100*(this.card.correct_answer_count/Math.max(this.card.total_answer_count,1)).toFixed(2)}}});r("0aab");Ue.render=Qe,Ue.__scopeId="data-v-2df34594";var Be=Ue,Ge=Object(c["b"])(Ie);Ge.config.compilerOptions.delimiters=["${","}"],Ge.component("CardAnswer",He),Ge.component("CardQuestion",Be),Ge.mount("#app")},"8eb0":function(e,t,r){},a12e:function(e,t,r){},aa3d:function(e,t,r){"use strict";r("fc17")},b5eb:function(e,t,r){"use strict";r("8eb0")},d158:function(e,t,r){"use strict";r("2d96")},fc17:function(e,t,r){}});
//# sourceMappingURL=main.js.map