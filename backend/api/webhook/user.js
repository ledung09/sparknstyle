import express from "express";
import { supabase } from "../../supabase/client.js";
import bcryptjs from "bcryptjs";  

export const webhookUserRouter = express.Router();

webhookUserRouter.post("/", async (req, res) => {
  try {
    const response = await req.body;
    const data = response.data;
    const upsertData = {
      id: data.id,
      image: data.profile_image_url,
      last_name: data.last_name,
      first_name: data.first_name,
      email: data.email_addresses[0].email_address,
    };

    await supabase.from("user").upsert(upsertData).select();
  } catch (e) {
    console.error(e);
    throw e;
  }

  res.status(201).send("Upsert user successfully!");
});

webhookUserRouter.post("/", async (req, res) => {
  try {
    const response = await req.body;
    const data = response.data;
    const upsertData = {
      id: data.id,
      image: data.profile_image_url,
      last_name: data.last_name,
      first_name: data.first_name,
      email: data.email_addresses[0].email_address,
    };

    await supabase.from("user").upsert(upsertData).select();
  } catch (e) {
    console.error(e);
    throw e;
  }

  res.status(201).send("Upsert user successfully!");
});

webhookUserRouter.post("/delete", async (req, res) => {
  try {
    const response = await req.body;
    const userId = response.data.id;
    await supabase.from("user").delete().eq("id", userId);
  } catch (e) {
    console.error(e);
    throw e;
  }

  res.status(204).send("Delete user successfully!");
});
