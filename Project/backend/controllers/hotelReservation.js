import mongoose from "mongoose";
import hotelReservation from "..models/hotelReservation.js";

export const createHotelReservation= async (req,res)=>{
    
    const hotelRes = req.body;

    const newHotelRes = newHotelRes(hotelRes);

    try {

        await newHotelRes.save();
        res.status(201).json(newHotelRes);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const showHotelReservation = async (req,res)=>{
    try {
        const hotelRes = await hotelReservation.find();  //fetching all the records

        res.status(200).json(hotelRes);

    } catch (error) {
        res.status(404).json({message: error});
    }
}

export const customizeHotelReservation = async(req,res)=>{

    const id=req.params.id; // allocating variable for ID passed
    const up= req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){  //Checks whether the record with the corresponding id exists in the DB
        return res.status(404).send('No Such Hotel Reservation');
    }

    try {
        await hotelRes.findByIdAndUpdate(id,up);
        res.status(200).send({status:"Hotel Reservation Updated"});
    } catch (error) {
        res.status(404).json({message:error});
    }
}

export const cancelHotelReservation = async(req,res)=>{

    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No Such Hotel Reservation');  //Checks whether the record with the corresponding ID exists in the DB
    }

    try {
        await hotelRes.findByIdAndDelete(id);
        res.status(200).send({status: "Hotel Reservation Deleted..."});
        
    } catch (error) {
        res.status(404).json({message: error});
    }
}