#!/usr/bin/env python
#
# First steps for easyweb, a content management system running on 
# appEngine.

import cgi
import os

import wsgiref.handlers


from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext import db

class Page(db.Model):
    url = db.StringProperty()
    html = db.StringProperty(multiline=True)
    creation_date = db.DateTimeProperty(auto_now_add=True)
    
class MainHandler(webapp.RequestHandler):
  def get(self):
    url = self.request.path
    pages=db.GqlQuery("SELECT * FROM Page WHERE url = :1", url)
    html="nothing here"
    for page in pages:      
        html=page.html 
    self.response.out.write(html)

class EditHandler(webapp.RequestHandler):
  def get(self):
    pages=db.GqlQuery("SELECT * FROM Page ORDER BY url")
    values = {
              'pages' : pages,
              }
    path = os.path.join(os.path.dirname(__file__),'easyweb-core', 'edit.html')
    self.response.out.write(template.render(path, values))

class SaveHandler(webapp.RequestHandler):
  def get(self):
    page=Page()
    page.url = self.request.get('url')
    page.html = self.request.get('html')
    page.put()
    self.redirect('/admin/')

def main():
  application = webapp.WSGIApplication([('/admin/?', EditHandler),
                                        ('/admin/save/?', SaveHandler),
                                        ('.*', MainHandler),
                                        ])
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
