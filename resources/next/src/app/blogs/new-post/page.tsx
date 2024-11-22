"use client";

import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import QuillTextEditor from "@/components/QuillTextEditor";

// Breadcrumb Component
const Breadcrumb = ({ pageName }: { pageName: string }) => (
    <nav className="mb-5">
        <span>Dashboard / </span>
        <span className="font-bold">{pageName}</span>
    </nav>
);

// DetailsForm Component
const DetailsForm = ({
    title,
    setTitle,
    content,
    setContent,
}: {
    title: string;
    setTitle: (value: string) => void;
    content: string;
    setContent: (value: string) => void;
}) => (
    <div className="rounded-lg border bg-white p-5 shadow-md">
        <h3 className="mb-3 text-lg font-medium">Details</h3>
        <div className="mb-4">
            <label className="mb-1 block font-medium">Blog Title</label>
            <input
                type="text"
                placeholder="Add title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
            />
        </div>
        <div>
            <label className="mb-1 block font-medium">Content</label>
            <textarea
                placeholder="Start writing here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-40 w-full rounded-md border px-3 py-2"
            />
        </div>
    </div>
);

// ThumbnailUploader Component
const ThumbnailUploader = ({
    setThumbnail,
}: {
    setThumbnail: (file: File | null) => void;
}) => (
    <div className="rounded-lg border bg-white p-5 shadow-md">
        <h3 className="mb-3 text-lg font-medium">Add Thumbnail</h3>
        <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full cursor-pointer rounded-md border p-2"
        />
    </div>
);

// PublishOptions Component
const PublishOptions = () => (
    <div className="rounded-lg border bg-white p-5 shadow-md">
        <h3 className="mb-3 text-lg font-medium">Publish</h3>
        <div className="mb-4">
            <button className="mr-2 rounded-md border px-4 py-2">
                Save Draft
            </button>
            <button className="rounded-md border bg-primary px-4 py-2 text-white">
                Preview
            </button>
        </div>
        <div>
            <label className="mb-2 block font-medium">Status:</label>
            <select className="rounded-md border px-3 py-2">
                <option>Draft</option>
                <option>Published</option>
            </select>
        </div>
        <div className="mt-4">
            <label className="mb-2 block font-medium">Visibility:</label>
            <input
                type="radio"
                name="visibility"
                value="private"
                className="mr-2"
            />
            Private
            <input
                type="radio"
                name="visibility"
                value="public"
                className="ml-4 mr-2"
            />
            Public
        </div>
        <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-white">
            Update
        </button>
    </div>
);

// CategoriesSelector Component
const CategoriesSelector = ({
    categories,
    setCategories,
}: {
    categories: number[];
    setCategories: (values: number[]) => void;
}) => (
    <div className="rounded-lg border bg-white p-5 shadow-md">
        <h3 className="mb-3 text-lg font-medium">Add Categories</h3>
        <ul className="max-h-40 overflow-y-auto">
            {["Category 1", "Category 2", "Category 3"].map((cat, index) => (
                <li key={index} className="mb-2">
                    <input
                        type="checkbox"
                        className="mr-2"
                        onChange={(e) => {
                            const newCategories = [...categories];
                            if (e.target.checked) {
                                newCategories.push(index + 1);
                            } else {
                                const idx = newCategories.indexOf(index + 1);
                                if (idx > -1) newCategories.splice(idx, 1);
                            }
                            setCategories(newCategories);
                        }}
                    />
                    {cat}
                </li>
            ))}
        </ul>
    </div>
);

// TagsInput Component
const TagsInput = ({
    tags,
    setTags,
}: {
    tags: string[];
    setTags: (tags: string[]) => void;
}) => {
    const [tag, setTag] = useState<string>("");

    const handleAddTag = () => {
        if (tag) {
            setTags([...tags, tag]);
            setTag("");
        }
    };

    return (
        <div className="rounded-lg border bg-white p-5 shadow-md">
            <h3 className="mb-3 text-lg font-medium">Tags</h3>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Insert tags"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="flex-1 rounded-md border px-3 py-2"
                />
                <button
                    onClick={handleAddTag}
                    className="ml-2 rounded-md bg-primary px-4 py-2 text-white"
                >
                    Add
                </button>
            </div>
            <div className="mt-3">
                {tags.map((t, i) => (
                    <span
                        key={i}
                        className="mr-2 rounded-md bg-gray-200 px-2 py-1 text-sm"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
};

// Main Component
const addNewPost = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [categories, setCategories] = useState<number[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (thumbnail) formData.append("thumbnail", thumbnail);
        formData.append("categories", JSON.stringify(categories));
        formData.append("tags", JSON.stringify(tags));

        try {
            const response = await fetch("http://localhost:8000/api/posts", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust for authentication
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                alert("Post created successfully!");
                console.log(result);
            } else {
                alert(
                    `Error: ${result.message || "Failed to submit the post."}`,
                );
                console.error(result);
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <DefaultLayout>
            <div className="p-5">
                <Breadcrumb pageName="Add a new Post" />
                <form
                    onSubmit={handleFormSubmit}
                    className="grid grid-cols-1 gap-5 md:grid-cols-3"
                >
                    <div className="col-span-2 flex flex-col gap-5">
                        <DetailsForm
                            title={title}
                            setTitle={setTitle}
                            content={content}
                            setContent={setContent}
                        />
                        <ThumbnailUploader setThumbnail={setThumbnail} />
                    </div>
                    <div className="flex flex-col gap-5">
                        <CategoriesSelector
                            categories={categories}
                            setCategories={setCategories}
                        />
                        <TagsInput tags={tags} setTags={setTags} />
                        <PublishOptions />
                    </div>
                    <button
                        type="submit"
                        className="col-span-3 rounded-md bg-primary px-4 py-2 text-white"
                    >
                        Submit Post
                    </button>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default addNewPost;
