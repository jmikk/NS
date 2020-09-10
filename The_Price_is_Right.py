import requests
from bs4 import BeautifulSoup
import csv
from time import sleep
import os
import sys
version = 1.0
print("This is Version " + str(version))
UserAgent=input("Please enter your nation name: ")
#makes the header
headers = {
    'User-Agent': UserAgent
}
UserAgent.replace(" ","_")
filename="Links.txt"
print("Hello, "+UserAgent)
BidOrAsk=input("Would you like to use Bid or Ask mode?: ")
BidOrAsk=BidOrAsk.lower()
HowClose=input("How close would you like to search? (For example 0.05 will look for bids/asks 0.05 bank away from your current bid/ask): ")
bigmode=input("Would you like live output? (This is good for players with a crazy number of cards you can press Ctrl-C to pause the program) Yes/No: ")
bigmode=bigmode.lower()
final_list=[]
	
		

#deletes the old file
if os.path.exists(filename):
  os.remove(filename)

print("Grabbing all of your cards and the shredder please wait....")
#pings the API for the nations full card list
url = "https://www.nationstates.net/cgi-bin/api.cgi?q=cards+asksbids;nationname="+UserAgent
result = requests.get(url, headers=headers)
#soups the data up so we can parse it
soup = BeautifulSoup(result.content, "xml")
sleep(.6)

cardID=[]
cardSeason=[]
userSetPrice=[]
count=0
#parses the data peeling off the ID, Season and Ask Price
if BidOrAsk == "ask":
	for x, y, z in zip(soup.find_all('CARDID'),soup.find_all('SEASON'),soup.find_all('ASK_PRICE')):
		count=count+1
		cardID.append(x.text)
		cardSeason.append(y.text)
		userSetPrice.append(z.text)
#parses the data peeling off the ID, Season and Bid Price
if BidOrAsk == "bid":
	for x, y, z in zip(soup.find_all('CARDID'),soup.find_all('SEASON'),soup.find_all('BID_PRICE')):
		count=count+1
		cardID.append(x.text)
		cardSeason.append(y.text)
		userSetPrice.append(z.text)
index=0
print("It will take approxamitly "+ str(count*1)+" secounds to shred all of your cards please wait.")
for card in cardID:
	#print(card + cardSeason[index]+"Step1")
	#pings the API for each card.
	url = "https://www.nationstates.net/cgi-bin/api.cgi?q=card+markets;cardid="+card+";season="+cardSeason[index]
	result = requests.get(url, headers=headers)
	soup = BeautifulSoup(result.content, "xml")
	#print(ID+SEASON)
	sleep(.6)
	for a, b in zip(soup.find_all('PRICE'),soup.find_all('TYPE')):
		#print("got here")
		if b.text == "bid" and BidOrAsk == "ask" and float(a.text) > float(userSetPrice[index])-float(HowClose):
			#print("https://www.nationstates.net/page=deck/card="+cardID[index]+"/season="+cardSeason[index])
			final_list.append("https://www.nationstates.net/page=deck/card="+cardID[index]+"/season="+cardSeason[index]+"\n")
			if bigmode == "yes":
				print("https://www.nationstates.net/page=deck/card="+cardID[index]+"/season="+cardSeason[index])
		if b.text == "ask" and BidOrAsk == "bid" and float(a.text) > float(userSetPrice[index])+float(HowClose):
			#print("https://www.nationstates.net/page=deck/card="+cardID[index]+"/season="+cardSeason[index])
			final_list.append("https://www.nationstates.net/page=deck/card="+cardID[index]+"/season="+cardSeason[index]+"\n")
			if bidmode == "yes":
				print("https://www.nationstates.net/page=deck/card="+cardID[index]+"/season="+cardSeason[index])
	#sleeper(card,cardSeason[index])
	index=index+1
if bigmode == "yes":
	print("***********************************************************************************************************************")
	print("The final list:")
final_list = list(dict.fromkeys(final_list))

with open(filename, 'a+') as f:
		f.writelines(final_list)
for themall in final_list:
	print(themall)

print("Have a nice day "+UserAgent)