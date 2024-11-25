"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

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
    <div className="rounded-lg border border-stroke bg-white p-4 p-5 shadow-1 shadow-md dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <h3 className="mb-3 text-lg font-medium">Details</h3>
        <div className="mb-4">
            <label className="mb-1 block font-medium">Blog Title</label>
            <input
                type="text"
                placeholder="Add title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
        </div>
        <div>
            <label className="mb-1 block font-medium">Content</label>
            <textarea
                placeholder="Start writing here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-40 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
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
    <div className="rounded-lg border border-stroke bg-white p-4 p-5 shadow-1 shadow-md dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <h3 className="mb-3 text-lg font-medium">Add Thumbnail</h3>
        <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
        />
    </div>
);

// PublishOptions Component
const PublishOptions = ({
    status,
    setStatus,
}: {
    status: string;
    setStatus: (value: string) => void;
}) => (
    <div className="rounded-lg border border-stroke bg-white p-4 p-5 shadow-1 shadow-md dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <h3 className="mb-3 text-lg font-medium">Publish</h3>
        <div className="mb-4">
            <button type="button" className="mr-2 rounded-md border px-4 py-2">
                Save Draft
            </button>
            <button
                type="button"
                className="rounded-md border bg-primary px-4 py-2 text-white"
            >
                Preview
            </button>
        </div>
        <div>
            <label className="mb-2 block font-medium">Status:</label>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="relative z-10 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2"
            >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
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
    </div>
);

// CategoriesSelector Component
const CategoriesSelector = ({
    categories,
    setCategories,
}: {
    categories: { id: number; name: string }[];
    setCategories: (categories: { id: number; name: string }[]) => void;
}) => {
    const [availableCategories, setAvailableCategories] = useState<
        { id: number; name: string }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/categories",
                );
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch categories: ${response.status}`,
                    );
                }
                const data = await response.json();
                setAvailableCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="rounded-lg border border-stroke bg-white p-4 p-5 shadow-1 shadow-md dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <h3 className="mb-3 text-lg font-medium">Add Categories</h3>
            {loading ? (
                <p>Loading categories...</p>
            ) : (
                <ul className="max-h-40 overflow-y-auto">
                    {availableCategories.map((cat) => (
                        <li key={cat.id} className="mb-2">
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={(e) => {
                                    const newCategories = [...categories];
                                    if (e.target.checked) {
                                        newCategories.push(cat);
                                    } else {
                                        const idx = newCategories.findIndex(
                                            (c) => c.id === cat.id,
                                        );
                                        if (idx > -1)
                                            newCategories.splice(idx, 1);
                                    }
                                    setCategories(newCategories);
                                }}
                                checked={categories.some(
                                    (c) => c.id === cat.id,
                                )}
                            />
                            {cat.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

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
        <div className="rounded-lg border border-stroke bg-white p-4 p-5 shadow-1 shadow-md dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <h3 className="mb-3 text-lg font-medium">Tags</h3>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Insert tags"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                <button
                    type="button"
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

const addNewPost = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [categories, setCategories] = useState<
        { id: number; name: string }[]
    >([]);
    const [tags, setTags] = useState<string[]>([]);
    const [status, setStatus] = useState<string>("draft");

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (thumbnail) formData.append("thumbnail", thumbnail);
        formData.append(
            "categories",
            JSON.stringify(categories.map((cat) => cat.name)),
        );
        formData.append("status", status);

        try {
            const response = await fetch("http://localhost:8000/api/posts", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                        <PublishOptions status={status} setStatus={setStatus} />
                        <button
                            name="submitPost"
                            type="submit"
                            className="col-span-3 rounded-md bg-primary px-4 py-2 text-white"
                        >
                            Submit Post
                        </button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default addNewPost;
