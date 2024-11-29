import { db } from "../datastore"
import type { Expresshandler, Post } from "../../types"
import { randomUUID } from "crypto"
import type { createPostRequest, createPostResponse, ListPostRequest, ListPostResponse } from "../api"



export const listPostsHandler: Expresshandler<ListPostRequest, ListPostResponse> = (req, res) => {
    res.send({ posts: db.listPost() })
}


export const createPostHAndler: Expresshandler<createPostRequest, createPostResponse> = (req, res) => {
    // TODO: validate data
    if (!req.body.title || !req.body.userID || !req.body.url)
        return res.sendStatus(400)

    const post: Post = {
        id: randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userID: req.body.userID
    }

    db.createPost(post)
    res.sendStatus(201)
}