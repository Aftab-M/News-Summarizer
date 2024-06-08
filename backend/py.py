import requests as rq
from bs4 import BeautifulSoup

url = 'https://www.bbc.com/news'

response = rq.get(url)

soup = BeautifulSoup(response.content, 'html.parser')


all_news = soup.find_all(name='article', class_='sc-9636e898-0 dYtsiK')

newss = all_news[0].find_all(name= 'a', class_='sc-2e6baa30-0 gILusN')
# raw_title_text = all_news.get_text()

# print(title_element)

newslinks = []
for i in newss : 
    # print(i.get_text())
    # one_element = i.find('a', class_='sc-2e6baa30-0 gILusN')
    link = i.get('href')
    # print(link)
    title = i.find('h2', class_='sc-4fedabc7-3 zTZri')
    # if(title):
    #     print(title.get_text())
    # print(one_element)
    if(link != '' ):
        if(title != None):
            # print(one_element.get('href'))
            if '/news/articles/' in link : 
                newslinks.append({'linkk': link, 'titlee':title.get_text()})
            

# print(newslinks)
for i in newslinks: 
    print(i)

# newslinks = newslinks[:5]

newses = []
def getTitleAndDescription() : 
    for i in newslinks:
        link_response = rq.get('https://www.bbc.com'+i['linkk'])
        # print(i)
        ss = BeautifulSoup(link_response.content, 'html.parser')
        # print(ss)

        # title = ss.find('div', class_='ssrcss-1ki8hfp-StyledZone e1mcntqj3')
        # print("\n\n-----------------------Title is : "+title.get_text())

        desc = ss.find_all('p', class_='sc-eb7bd5f6-0 fYAfXe')
        # print(desc)
        # desctext = desc.find_all(text=True, recursive=False)
        # print(desctext)
        desc = desc[:-2]
        dd = ""
        for k in desc:
            dd += k.getText()
        print('Title : ',i['titlee'],'\n')
        print(dd+'\n\n\n')
        # if title != None and desc != None:
            # newses.append({'title' : i['titlee'], 'desc' : desc.getText()})


getTitleAndDescription()
































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

