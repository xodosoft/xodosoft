"use client"

import { Check, ChevronsUpDown, Loader2, Pencil, Plus, Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { CategorySchema } from "@/lib/validationSchemas"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"

type Category = {
    id: string
    name: string
}

type CategoryManagerProps = {
    value?: string
    onChange?: (value: string | undefined) => void
    onCategorySelect?: (category: Category | undefined) => void
}

function resetPointerEvents() {
    if (document.body.style.pointerEvents === 'none') {
        document.body.style.pointerEvents = '';
    }
}

export default function CategorySelect({ value, onChange, onCategorySelect }: CategoryManagerProps) {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [editCategory, setEditCategory] = useState<Category | null>(null)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)


    useEffect(() => {
        resetPointerEvents();
    }, [addDialogOpen, editDialogOpen]);

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
        },
    })

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/categories")
            const data = await response.data
            setCategories(data)
        } catch (error) {
            console.error(error);
            toast.error("Failed to load categories");
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    // Add a new category
    const addCategory = async (data: z.infer<typeof CategorySchema>) => {
        try {
            setLoading(true);
            const { name } = data;

            const response = await axios.post("/api/categories", {
                name
            });

            if (response.data) {
                toast.success(response.data.message);
                form.reset();
                setAddDialogOpen(false);
                fetchCategories();
            }
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            }
        }
        finally {
            setLoading(false);
        }
    }

    // Update an existing category
    const updateCategory = async (data: z.infer<typeof CategorySchema>) => {
        if (!editCategory) return

        try {
            setLoading(true);
            const response = await axios.patch(`/api/categories?id=${editCategory.id}`, data)

            if (response.data) {
                toast.success(response.data.message);
            }

            form.reset()
            setEditDialogOpen(false)
            setEditCategory(null)
            fetchCategories()
        } catch (error) {
            console.error("Error updating category:", error)
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            }
        }
        finally {
            setLoading(false);
        }
    }

    // Delete a category
    const deleteCategory = async (id: string) => {
        try {
            const response = await axios.delete(`/api/categories?id=${id}`)

            if (response.data) {
                toast.success(response.data.message);
            }

            if (value === id) {
                onChange?.(undefined)
                onCategorySelect?.(undefined)
            }

            fetchCategories()
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            }
        }
    }

    const handleSelect = (categoryId: string) => {
        const selectedCategory = categories.find((cat) => cat.id === categoryId)
        onChange?.(categoryId)
        onCategorySelect?.(selectedCategory)
        setOpen(false)
    }

    const handleEdit = (category: Category) => {
        setEditCategory(category)
        form.reset({ name: category.name })
        setEditDialogOpen(true)
    }

    const handleAddDialogOpen = () => {
        form.reset({ name: "" })
        setAddDialogOpen(true)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : value ? (
                                categories.find((category) => category.id === value)?.name || "Select category"
                            ) : (
                                "Select category"
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandList>
                                <CommandEmpty>{loading ? "Loading..." : "No category found."}</CommandEmpty>
                                <CommandGroup>
                                    {categories.map((category) => (
                                        <CommandItem
                                            key={category.id}
                                            value={category.id}
                                            onSelect={() => handleSelect(category.id)}
                                            className="flex items-center justify-between"
                                        >
                                            <span>{category.name}</span>
                                            {category.id === value && <Check className="h-4 w-4" />}
                                            <div className="ml-auto flex items-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleEdit(category)
                                                            }}
                                                        >
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-destructive focus:text-destructive"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                deleteCategory(category.id)
                                                            }}
                                                        >
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen} >
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleAddDialogOpen}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Category</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(addCategory)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter category name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button type="button" variant="outline" size={"sm"} onClick={() => setAddDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" size={"sm"} disabled={loading}>Create</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Edit Category Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(updateCategory)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter category name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="button" variant="outline" size={"sm"} onClick={() => setEditDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" size={"sm"} disabled={loading}>Update</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
