﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add('domiterator');(function(){function a(f){var g=f.startContainer;if(f.collapsed||g.type!=CKEDITOR.NODE_ELEMENT)return g;return g.getChildCount()>f.startOffset?g.getChild(f.startOffset):g;};function b(f){var g=f.endContainer;if(f.collapsed||g.type!=CKEDITOR.NODE_ELEMENT)return g;return g.getChildCount()>f.endOffset?g.getChild(f.endOffset):g;};function c(f,g,h,i){if(!f)return null;var j;if(!g&&f.getFirst&&f.getFirst())j=f.getFirst();else{if(i&&f.equals(i))return null;j=f.getNext();if(!j&&(!i||!i.equals(f.parentNode)))return c(f.getParent(),true,h,i);}if(h&&j&&j.type!=h)return c(j,false,h,i);return j;};var d=function(f){var g=this;if(arguments.length<1)return;g.range=f;g.forceBrBreak=false;g.enforceRealBlocks=false;g._||(g._={});},e=/^[\r\n\t ]+$/;d.prototype={getNextParagraph:function(f){var A=this;var g,h,i,j,k;if(!A._.lastNode){h=A.range.clone();h.enlarge(A.forceBrBreak?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:CKEDITOR.ENLARGE_BLOCK_CONTENTS);A._.nextNode=a(h);A._.lastNode=b(h);h=null;}var l=A._.nextNode,m=A._.lastNode;A._.nextNode=null;while(l){var n=false,o=l.type!=CKEDITOR.NODE_ELEMENT,p=false;if(!o){var q=l.getName();if(l.isBlockBoundary(A.forceBrBreak&&{br:1})){if(q=='br')o=true;else if(!h&&l.getChildCount()==0&&q!='hr'){g=l;i=l.equals(m);break;}if(h){h.setEndAt(l,CKEDITOR.POSITION_BEFORE_START);if(q!='br')A._.nextNode=c(l,true,null,m)||l;}n=true;}else{if(l.getFirst()){if(!h){h=new CKEDITOR.dom.range(A.range.document);h.setStartAt(l,CKEDITOR.POSITION_BEFORE_START);}l=l.getFirst();continue;}o=true;}}else if(l.type==CKEDITOR.NODE_TEXT)if(e.test(l.getText()))o=false;if(o&&!h){h=new CKEDITOR.dom.range(A.range.document);h.setStartAt(l,CKEDITOR.POSITION_BEFORE_START);}i=(!n||o)&&(l.equals(m));if(h&&!n)while(!l.getNext()&&!i){var r=l.getParent();if(r.isBlockBoundary(A.forceBrBreak&&{br:1})){n=true;i=i||r.equals(m);break;}l=r;o=true;i=l.equals(m);p=true;}if(o)h.setEndAt(l,CKEDITOR.POSITION_AFTER_END);if((n||i)&&(h)){var s=h.getBoundaryNodes(),t=new CKEDITOR.dom.elementPath(h.startContainer),u=new CKEDITOR.dom.elementPath(h.endContainer);if(s.startNode.equals(s.endNode)&&s.startNode.getParent().equals(t.blockLimit)&&s.startNode.type==CKEDITOR.NODE_ELEMENT&&s.startNode.getAttribute('_fck_bookmark'))h=null;else break;}if(i)break;l=c(l,p,null,m);}if(!g){if(!h){A._.nextNode=null;return null;}var t=new CKEDITOR.dom.elementPath(h.startContainer),v=t.blockLimit,w={div:1,th:1,td:1};g=t.block;if(!g&&!A.enforceRealBlocks&&w[v.getName()]&&h.checkStartOfBlock()&&h.checkEndOfBlock())g=v;
else if(!g||A.enforceRealBlocks&&g.getName()=='li'){g=A.range.document.createElement(f||'p');h.extractContents().appendTo(g);g.trim();h.insertNode(g);j=k=true;}else if(g.getName()!='li')if(!h.checkStartOfBlock()||!h.checkEndOfBlock()){g=g.clone(false);h.extractContents().appendTo(g);g.trim();var x=h.splitBlock();j=!x.wasStartOfBlock;k=!x.wasEndOfBlock;h.insertNode(g);}else if(!i)A._.nextNode=g.equals(m)?null:c(h.getBoundaryNodes().endNode,true,null,m);}if(j){var y=g.getPrevious();if(y&&y.type==CKEDITOR.NODE_ELEMENT)if(y.getName()=='br')y.remove();else if(y.getLast()&&y.getLast().$.nodeName.toLowerCase()=='br')y.getLast().remove();}if(k){var z=g.getLast();if(z&&z.type==CKEDITOR.NODE_ELEMENT&&z.getName()=='br')z.remove();}if(!A._.nextNode)A._.nextNode=i||g.equals(m)?null:c(g,true,null,m);return g;}};CKEDITOR.dom.range.prototype.createIterator=function(){return new d(this);};})();