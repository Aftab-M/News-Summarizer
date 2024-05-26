import requests as rq
from bs4 import BeautifulSoup

url = 'https://synthedia.substack.com/p/adobe-firefly-is-here-its-free-its'

response = rq.get(url)

soup = BeautifulSoup(response.content, 'html.parser')


title_element = soup.find(name='h1', class_='post-title unpublished')

raw_title_text = title_element.get_text()

print(title_element)

print('\n')
print(raw_title_text)


news = "https://timesofindia.indiatimes.com/"

