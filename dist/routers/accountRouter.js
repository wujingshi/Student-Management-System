"use strict";var express=require("express"),path=require("path"),accountRouter=express.Router(),accountRouterCRTL=require(path.join(__dirname,"../controllers/accountRountCRTL.js"));accountRouter.get("/login",accountRouterCRTL.getLoinPage),accountRouter.get("/vcode",accountRouterCRTL.getVcodeImage),accountRouter.get("/login",accountRouterCRTL.login),accountRouter.get("/logout",accountRouterCRTL.logout),accountRouter.get("/register",accountRouterCRTL.getRegisterPage),accountRouter.get("/register",accountRouterCRTL.register),module.exports=accountRouter;