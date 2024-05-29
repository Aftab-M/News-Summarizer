import requests as rq
from bs4 import BeautifulSoup

url = 'https://timesofindia.indiatimes.com/sports'

response = rq.get(url)

soup = BeautifulSoup(response.content, 'html.parser')


all_news = soup.find_all(name='div', class_='iN5CR')

# raw_title_text = title_element.get_text()

# print(title_element)

newslinks = []
for i in all_news : 
    # print(i.get_text())
    one_element = i.find('a', class_='lfn2e')
    if(one_element and one_element.has_attr('href')):
        if(one_element.get('href').find('.cms')!=-1):
            # print(one_element.get('href'))
            newslinks.append(one_element.get('href'))


# newslinks = newslinks[:5]

newses = []
def getTitleAndDescription() : 
    for i in newslinks:
        link_response = rq.get(i)
        print(i)
        ss = BeautifulSoup(link_response.content, 'html.parser')
        # print(ss)

        title = ss.find('h1', class_='HNMDR')
        print("\n\n-----------------------Title is : "+title.get_text())

        desc = ss.find('div', class_='_s30J clearfix')
        print(desc.get_text())
        print('\n')
        
        if title != None and desc != None:
            newses.append({'title' : title.getText(), 'desc' : desc.getText()})


getTitleAndDescription()


print('\n')
# print(raw_title_text)


news = "https://timesofindia.indiatimes.com/"






























# import requests as rq
# from bs4 import BeautifulSoup

# url = 'https://synthedia.substack.com/p/adobe-firefly-is-here-its-free-its'

# response = rq.get(url)

# soup = BeautifulSoup(response.content, 'html.parser')


# title_element = soup.find(name='h1', class_='post-title unpublished')

# raw_title_text = title_element.get_text()

# print(title_element)

# print('\n')
# print(raw_title_text)


# news = "https://timesofindia.indiatimes.com/"

