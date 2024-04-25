---
title: "Tech: Personal Knowledge Management (PKM) tools"
tags: [tech, pkm, obsidian, logseq, dendron, foam, markdown, foss]
published: 2024-04-25
---
Personal Knowledge Management tools are there to help you collect, combine, query and visualize your thoughts, notes and memories. If used correctly, this leads to a personal knowledge database that you can use as a "second brain". Store notes and information in a way that makes it easy to find and create cross references between them. Usually those tools also have a visualization feature which results in a graph that looks a lot like neurons connected with synapses.  
In this post I'll share my brief experiences with the three PKM tools I tried out: Dendron, Foam and Logseq.

## My requirements
These are the requirements that a PKM tool should fulfill to be considered by me:
* I want to be able to use it both in private and at work
* I want to use on my PC, laptop and Android phone
* The work should be synched between devices (but I don't mind if it requires a one time complicated setup)
* The format should be at least somehow portable, in case I need to migrate to a different tool for whatever reason

All the tools listed below use mostly Markdown under the hood, sometimes with excessive front matter, sometimes with some proprietary tags. But that's good enough to fulfill the "portability" requirement.

Here come the tools!

## Obsidian: The elephant in the room
Let's start with a tool I _did not_ try out. [Obsidian](https://obsidian.md/) is the big player in the game - you will find hundreds of articles on the internet and thousands of hours of tutorials on YouTube about how to set it up, use it, what the best structure is, the best plugins, etc. It has the biggest community, the most stable apps, the biggest collection of plugins.

Why did I not even try it out? Because it is not open source and requires you to buy a commercial license if you are planning to use it at work. If you can live with those details, then Obsidian most likely is the best tool you can currently use for PKM.

## Dendron: Turn VS Code into a PKM tool (also it's dead)
The first tool I tried to use for PKM was [Dendron](https://www.dendron.so/), and I stuck with it for a few months. It has an interesting approach - instead of being a standalone app or website, it is a quite large extension for [Visual Studio Code](https://code.visualstudio.com/). At first I quite liked this way - I like vscode, use it a lot both privately (like writing this blog entry right now) and also at work for light file editing. Working with Dendron on a PC after learning some best practices, keyboard shortcuts and commands can be a breeze. Here and there I saw some quirks with the graph or indices not updating, but nothing major.

At the end there were two deal breakers for me:
* VS Code extension means no mobile app. There are some suggestions about which apps to use on your phone to edit the markdown files, after you managed to sync them to it, but even after automating all the syncing via git, Termux and Tasker it still was a pain to quickly write some notes on the go.
* In February 2023 the main developers of Dendron announced on their Discord that they are ceasing active development of the tool.

The quirks while using it, the bad mobile experience and the stopped development pushed me to look for an alternative.

## Foam: Similar to Dendron but worse (but under active development!)
The next thing I decided to try out, after skimming a bunch of blogs and reddit posts about [foss](https://en.wikipedia.org/wiki/Free_and_open-source_software) PKM tools during last year's summer vacation, was [Foam](https://foambubble.github.io/foam/). My experience was "like Dendron, but mostly worse". Instead of one big extension, it is a collection of VS Code extensions. In direct comparison to Dendron, it has more (or other) quirks while using, the same pro (using VS Code on PC) and the same huge con (no mobile experience). After an hour or two, I continued with my search for a better tool.

## Logseq: The tool I'm currently using
Finally I found, tried out and stuck until now with [Logseq](https://logseq.com/). It is open source, standalone, and has apps for MacOS (and the app design mostly caters to this), Windows, Linux, iOS and Android. There is an active community, it's being actively developed, has (paid, optional) cloud support for syncing and has a plugin api and a plugin marketplace with currently over 300 plugins.

### What does Logseq have in common with other popular PKM tools
* You can take quick notes or design full pages, tag them, and link bi-directionally from page to page
* The content you create is stored in the markdown format which is human readable and at least somehow portable to other tools
* It can create and display a pretty graph of all your pages and documents and their connections and relations
* There is a built in possibility to turn all, or some, of your "graph" (that's what Logseq calls your "workspace") as an html page
* There is a paid, optional service to sync your graph (securely) to the cloud (which I'm not using)

### What does Logseq do differently than other tools
There is whiteboard and flashcard functionality built it, but I haven't really used it yet.

In most other tools the main unit of holding/organizing information are pages, in Logseq it's __text blocks__. You can individually reference, address and query individual blocks. This is to some extend also possible in some other tools with some workarounds, but here it is the modus operandi.  
Everything you write is a bullet point under the hood (you can choose in the settings if you want to see the bullet or not), which makes it always trivial to create some kind of hierarchy in your document.

Logseq really wants you to just journal - the default page you see when opening the app is a journal page with the current date. This felt really strange to me, but after I gave it a few chances, _I finally saw the light_. Combined with the fact about everything being a bullet point under the hood, you can just dump content, thoughts, notes, etc. in the journal and when you have a minute to spend, organize them on pages that make sense.  
__As long as you use some tags, references, or at least strong keywords, it becomes very easy to quickly whip up a page that references (and embeds, if you want to), sorts and puts your previously unorganized bullet points in context with other things in your "graph".__

This is, besides the price-tag and foss-license, is ___the main strength of Logseq___ - it is incredibly easy to just write something down the moment you think about it and organize it later.

### What's not so great?
No tool is perfect - here are some gripes I had or have with Logseq:
* The app is not super stable and not too light on resources. It can crash from time to time and doesn't perform super well on my old, underpowered laptop.
* The (quite good) official documentation is hard to find (find it [here](https://docs.logseq.com/#/page/contents)). Both the official webpage and a lot of google results link to the community hub, which is full of mostly high quality, but quite long videos. Easy to work around, but you need to be aware of it - I was quite pissed in my first hours of learning the app because I did not know about the actual docs.
* The documentation of the (powerful and not too hard to use - it's just javascript!) plugin api is... not existent. The most useful thing you get linked to is a repository with a bunch of official plugin samples. Come on, write what your bloody functions, events, and params mean instead of forcing me to read your code!
* Plugins can only be used on the desktop versions, not on mobile
* Mini-gripe - I'm not the biggest fan of the graphical design of the app. But I can live with that :D

### How do I synch my data?
Attentive readers will have noticed that synching between devices is in my list of requirements, but I'm not using the official cloud synching service. How am I doing it?

Well, maybe, but just maybe, I spend a day of my last year's summer vacation, after researching PKM tools, to write a custom plugin for Logseq that synchronizes the Logseq graph to a git repository every time you stopped typing...  
I need to clean it up a bit and will try to publish it on the Logseq plugin marketplace, promised!

## Should I try Logseq if I'm already using Obsidian?
Obsidian has a more active community, bigger plugin ecosystem and (I assume) runs faster and is more stable - chances are if you are happy with it right now, you won't find a good reason to switch.  
But, of course, Logseq is free. So if you want to spend a weekend playing around with a different tool, nothing is stopping you. Especially if you find yourself thinking about layouting and structuring your thoughts/notes too much, it might be that Logseq's "just dump stuff in the journal every day"-approach could make it easier to get started with using a PKM tool more often. I quite like it! 

## Closing remarks
That's it from my side - I tried three PKM tools, focusing on the open source ones, and stuck with Logseq. I'm still using it way too little (because I often forget about it) and writing this blog post will hopefully put it on my mind more often :D