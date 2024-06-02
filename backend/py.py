import requests as rq
from bs4 import BeautifulSoup

url = 'https://www.bbc.com/sport'

response = rq.get(url)

soup = BeautifulSoup(response.content, 'html.parser')


all_news = soup.find_all(name='div', class_='ssrcss-1va2pun-UncontainedPromoWrapper eqfxz1e5')

# raw_title_text = title_element.get_text()

# print(title_element)

newslinks = []
for i in all_news : 
    # print(i.get_text())
    one_element = i.find('a', class_='ssrcss-zmz0hi-PromoLink exn3ah91')
    title = i.find('p', class_='ssrcss-1nzemmm-PromoHeadline exn3ah96')
    if(title):
        print(title.get_text())
    # print(one_element)
    if(one_element and one_element.has_attr('href')):
        if(one_element != None and title != None):
            # print(one_element.get('href'))
            if '/sounds/' not in one_element.get('href') : 
                newslinks.append({'linkk': one_element.get('href'), 'titlee':title.get_text()})
            

# print(newslinks)

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

        desc = ss.find('div', class_='ssrcss-uf6wea-RichTextComponentWrapper ep2nwvo0')
        # desctext = desc.find_all(text=True, recursive=False)
        # print(desctext)
        if desc != None :
            print(desc.getText())
        print('\n')
        
        if title != None and desc != None:
            newses.append({'title' : i['titlee'], 'desc' : desc.getText()})


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

