import sql from 'mssql';
import config from '../db/config.js';
import jwt from 'jsonwebtoken';
import {verifyToken} from '../utility/verifyToken.js'
import {validationResult} from 'express-validator';
// get all plans
export const getAllplans = async (req,res) =>{
    try{
        let pool = await sql.connect(config.sql);
        const result= await pool.request()
        .query("SELECT *FROM Plans")
        res.status(200).json(result.recordset);
    } catch (error){
        console.error(error)
        res.status(500).json({message:'An Errorr Occured'});
    } finally{
        sql.close();
    }
};

// Get Plan By ID

export const getPlanById = async (req,res) =>{
    const {plan_id} = req.params;
    try{
        let pool = await sql.connect(config.sql);
        const result= await pool.request()
       .input('plan_id',sql.Int,plan_id)
       .query("SELECT *FROM Plans WHERE plan_id = @plan_id")
        res.status(200).json(result.recordset);
    } catch (error){
        console.error(error)
        res.status(500).json({message:'An Errorr Occured'});
    } finally{
        sql.close();
    }
};

// Choose a plan 

// Authentication Middleware
const authenticateUser = (req,res,next) =>{
    const authHeader = req.header.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                res.status(401).json({message:'Invalid Token'});
            } else{
                req.decoded = decoded;
                next();
            }
        });
    } else{
        res.status(401).json({message:'No Token Provided'});
    }
};

// Choose a plan and store it in the subscription tabble
export const choosePlan = async (req, res) => {
    const { plan_id, user_id, subscription_date } = req.body;
  
    try {
      let pool = await sql.connect(config.sql);
  
      await pool
        .request()
        .input('user_id', sql.Int, user_id)
        .input('subscription_date', sql.DateTime, new Date(subscription_date))
        .input('plan_id', sql.Int, plan_id) // Use planId directly in the query
        .query(`
          INSERT INTO Subscriptions (plan_id, user_id, subscription_date)
          VALUES (@plan_id, @user_id, @subscription_date)
        `);
  
      res.status(200).json({ message: 'Plan chosen successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to choose a plan' });
    }
  };
  