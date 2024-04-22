---
title: "Tech: Personal Knowledge Management (PKM) tools"
tags: [tech, pkm, obsidian, logseq, dendron, foam, markdown, foss]
---
Personal Knowledge Management tools are there to help you collect, combine, query and visualize your notes. If done correctly, this leads to a personal knowledge database that you can use as a "second brain". Store notes and information in a way that makes it easy to find and create cross references between them. Usually those tools also have a visualization feature which results in a graph that looks a lot like neurons connected with synapses.  
In this post I'll share my brief experiences with the three PKM tools I tried out: Dendron, Foam and Logseq.

## Obsidian: the elephant in the room
Let's start with a tool I did not try out. [Obsidian](https://obsidian.md/) is the big player in the game - you will find hundreds of articles on the internet and thousands of hours of tutorials on YouTube about how to set it up, use it, what the best structure is, the best plugins, etc. It has the biggest community, the most stable apps, the biggest collection of plugins.

Why did I not even try it out? Because it is not open source and requires you to buy a commercial license if you are planning to use it at work. If you can live with those details, then Obsidian most likely is the best tool you can currently use for PKM.

## Dendron: turn VS Code into a PKM tool (also it's dead)
The first tool I tried to use to try out PKM was [Dendron](https://www.dendron.so/). It has an interesting approach - instead of being a standalone app or website, it is a quite large extension for [Visual Studio Code](https://code.visualstudio.com/). At first I quite liked the approach - I like vscode, use it a lot both privately (like writing this blog entry right now) and also at work for light file editing. Working with Dendron on a PC after learning some best practices, keyboard shortcuts and commands can be a breeze. Here and there I saw some quirks with the graph or indices not updating, but nothing major.

At the end there were two deal breakers for me:
* VS Code extension means no mobile app. There are some suggestions about which apps to use on your phone to edit the markdown files, after you managed to sync them to it, but even after automating all the syncing via git, Termux and Tasker it still was a pain to quickly write some notes on the go.
* In February 2023 the main developers of Dendron announced on their Discord that they are ceasing active development of the tool.

The quirks while using it, the bad mobile experience and the stopped development pushed me to look for an alternative.

## Foam: like Dendron but worse (but under active development!)
The next thing I decided to try out, after skimming a bunch of blogs and reddit posts about FOOS PKM tools during last year's summer vacation, was [Foam](https://foambubble.github.io/foam/). My experience was "like Dendron, but mostly worse". Instead of one big extension, it is a collection of VS Code extensions. In direct comparison to Dendron, it has more (or other) quirks while using, the same pro (using VS Code on PC) and the same huge con (no mobile experience). After an hour or two, I continued with my search for a better tool.

## Logseq: the tool I'm currently using
Finally I found, tried out and stuck with my current PKM tool - [Logseq](https://logseq.com/). 
