import requests as rq
from bs4 import BeautifulSoup

url = 'https://timesofindia.indiatimes.com/'

response = rq.get(url)

soup = BeautifulSoup(response.content, 'html.parser')

# nEjlO

# title_element = soup.find_all(name='div', class_='atWBy Q6d5H grid_wrapper')

# Works for getting a lot of stuff, but only text, no link
# title_element = soup.find_all(name='figcaption')


title_element = soup.find_all(name='div', class_='col_l_6')



# raw_title_text = title_element.get_text()

newslinks = []

for i in title_element:
    one_element = i.find('a', class_='Hn2z7 undefined')
    if one_element and one_element.has_attr('href'):
        newslinks.append(one_element.get('href'))
    

# print(newslinks)


newses = [
    
]

def getTitleAndDescription() : 
    for i in newslinks:
        link_response = rq.get(i)
        ss = BeautifulSoup(link_response.content, 'html.parser')
        t_element = ss.find('h1', class_='HNMDR')
        # if t_element != None:
        #     print('Got the title : ',t_element.getText())

        t_desc = ss.find('div', class_='_s30J clearfix')
        # if t_desc != None:
        #     print(t_desc.getText())

        if t_element != None and t_desc != None:
            newses.append({'title' : t_element.getText(), 'desc' : t_desc.getText()})


getTitleAndDescription()


print(newses)

