"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const tipsPath = path.join(process.cwd(), "src/data/tips.json");
const articlesPath = path.join(process.cwd(), "src/data/articles.json");

export async function getTips() {
    const data = await fs.readFile(tipsPath, "utf-8");
    return JSON.parse(data);
}

export async function addTip(formData: FormData) {
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    const type = formData.get("type") as string;

    const data = await fs.readFile(tipsPath, "utf-8");
    const tips = JSON.parse(data);

    const newTip = { id: Date.now().toString(), type, title, desc };
    tips.push(newTip);

    await fs.writeFile(tipsPath, JSON.stringify(tips, null, 2));
    revalidatePath("/");
    revalidatePath("/admin");
}

export async function deleteTip(id: string) {
    const data = await fs.readFile(tipsPath, "utf-8");
    let tips = JSON.parse(data);
    tips = tips.filter((t: any) => t.id !== id);

    await fs.writeFile(tipsPath, JSON.stringify(tips, null, 2));
    revalidatePath("/");
    revalidatePath("/admin");
}

// ARTICLES
export async function getArticles() {
    const data = await fs.readFile(articlesPath, "utf-8");
    return JSON.parse(data);
}

export async function addArticle(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const data = await fs.readFile(articlesPath, "utf-8");
    const articles = JSON.parse(data);

    const newArticle = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toISOString().split("T")[0],
    };
    articles.push(newArticle);

    await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
    revalidatePath("/news");
    revalidatePath("/admin");
}

export async function deleteArticle(id: string) {
    const data = await fs.readFile(articlesPath, "utf-8");
    let articles = JSON.parse(data);
    articles = articles.filter((a: any) => a.id !== id);

    await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
    revalidatePath("/news");
    revalidatePath("/admin");
}
