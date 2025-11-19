"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Plus,
    Trash2,
    Calendar,
    Loader2,
    FileText,
    Edit,
    Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { testimonialService } from "@/lib/services";
import { Testimonial } from "@/lib/supabase";

export default function TestimonialsAdminPage() {
    const { toast } = useToast();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newTestimonial, setNewTestimonial] = useState({
        id: 0,
        stars_number: "",
        author_name: "",
        author_picture_url: "",
        testimonial_description: "",
    });
    const [checkNewTestimonial, setCheckNewTestimonial] = useState({
        id: 0,
        stars_number: "",
        author_name: "",
        author_picture_url: "",
        testimonial_description: "",
    });
    const [testimonialMode, setTestimonialMode] = useState("");
    const [testimonialID, setTestimonialID] = useState(0);

    // Cargar testimonials al montar el componente
    useEffect(() => {
        loadTestimonials();
    }, []);

    const loadTestimonials = async () => {
        try {
            setLoading(true);
            const TestimonialsData = await testimonialService.getAllTestimonials();
            setTestimonials(TestimonialsData);
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to load testimonials: ${error}`,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddTestimonial = async () => {
        if (Number(newTestimonial.stars_number) < 0 || Number(newTestimonial.stars_number) > 5) {
            toast({
                title: "Required field",
                description: "Please fill the stars number field with a number between 1 to 5",
                variant: "destructive",
            });
            return;
        }
        if (!newTestimonial.stars_number || !newTestimonial.author_name || !newTestimonial.testimonial_description) {
            toast({
                title: "Required fields",
                description: "Please fill all the fields with a * symbol",
                variant: "destructive",
            });
            return;
        }
        try {
            const created = await testimonialService.createTestimonial({
                stars_number: Number(newTestimonial.stars_number),
                author_name: newTestimonial.author_name,
                author_picture_url: newTestimonial.author_picture_url || "",
                testimonial_description: newTestimonial.testimonial_description
            });

            setShowAddModal(false);
            setNewTestimonial({ id: 0, stars_number: "", author_name: "", author_picture_url: "", testimonial_description: "" });
            await loadTestimonials()
            toast({
                title: "Testimonial added",
                description: `Testimonial from ${created.author_name} has been added to Testimonials`,
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.message || "Failed to add testimonial",
                variant: "destructive",
            });
        }
    };

    const handleEditTestimonialData = async (testimonialData: Testimonial) => {
        setCheckNewTestimonial({
            id: testimonialData.id,
            stars_number: testimonialData.stars_number.toString(),
            author_name: testimonialData.author_name,
            author_picture_url: testimonialData.author_picture_url,
            testimonial_description: testimonialData.testimonial_description,
        })
        setNewTestimonial({
            id: testimonialData.id,
            stars_number: testimonialData.stars_number.toString(),
            author_name: testimonialData.author_name,
            author_picture_url: testimonialData.author_picture_url,
            testimonial_description: testimonialData.testimonial_description,
        })
        setShowAddModal(true)
    }

    const handleEditTestimonial = async () => {
        if (JSON.stringify(checkNewTestimonial) === JSON.stringify(newTestimonial)) {
            toast({
                title: "No new changes",
                description: "Please make changes to the testimonial before updating it",
                variant: "destructive",
            });
            return;
        }
        try {
            const created = await testimonialService.updateTestimonial(newTestimonial.id, {
                stars_number: Number(newTestimonial.stars_number),
                author_name: newTestimonial.author_name,
                author_picture_url: newTestimonial.author_picture_url || "",
                testimonial_description: newTestimonial.testimonial_description
            });

            setShowAddModal(false);
            setNewTestimonial({ id: 0, stars_number: "", author_name: "", author_picture_url: "", testimonial_description: "" });
            await loadTestimonials()
            toast({
                title: "Testimonial updated",
                description: `Testimonial from ${created.author_name} has been updated`,
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.message || "Failed to update testimonial",
                variant: "destructive",
            });
        }
    }

    const handleDeleteTestimonial = async (id: number) => {
        setShowDeleteModal(false)
        const testimonial = testimonials.find((v) => v.id === id);
        if (!testimonial) return;

        try {
            await testimonialService.deleteTestimonial(id);
            setTestimonials(testimonials.filter((v) => v.id !== id));

            toast({
                title: "Testimonial deleted",
                description: `Testimonial from ${testimonial.author_name} has been removed`,
                variant: "destructive",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete testimonial",
                variant: "destructive",
            });
        }
    };

    // Get latest testimonial date
    const latestTestimonial = testimonials.length > 0 ? testimonials[0] : null;
    const lastUploadDate = latestTestimonial ? new Date(latestTestimonial.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }) : 'No testimonials yet';

    const totalTestimonials = testimonials.length;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-lime-600" />
                    <p className="text-muted-foreground">Loading testimonials...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
                    <p className="text-sm text-gray-600">
                        Manage all Testimonials content
                    </p>
                </div>
                <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setTestimonialMode("Add Testimonial")} className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Testimonial
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                        <DialogHeader>
                            <DialogTitle>Add Testimonial</DialogTitle>
                            <DialogDescription>
                                Enter the information for the new testimonial.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="stars number">Stars Number *</Label>
                                <Input
                                    id="stars number"
                                    value={newTestimonial.stars_number}
                                    onChange={(e) =>
                                        setNewTestimonial({ ...newTestimonial, stars_number: e.target.value })
                                    }
                                    placeholder="e.g., 5"
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="author name">Testimonial Author Name *</Label>
                                <Input
                                    id="author name"
                                    value={newTestimonial.author_name}
                                    onChange={(e) =>
                                        setNewTestimonial({ ...newTestimonial, author_name: e.target.value })
                                    }
                                    placeholder="e.g., Claudia Gutierrez"
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="author picture url">Testimonial Author Picture Url (Optional)</Label>
                                <Input
                                    id="author picture url"
                                    value={newTestimonial.author_picture_url}
                                    onChange={(e) =>
                                        setNewTestimonial({ ...newTestimonial, author_picture_url: e.target.value })
                                    }
                                    placeholder="e.g., https://AuthorPicture.com"
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="testimonial description">Testimonial Description *</Label>
                                <Textarea
                                    id="testimonial description"
                                    value={newTestimonial.testimonial_description}
                                    onChange={(e) =>
                                        setNewTestimonial({ ...newTestimonial, testimonial_description: e.target.value })
                                    }
                                    placeholder="Testimonial description content"
                                    rows={3}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowAddModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => testimonialMode == "Add Testimonial" ? handleAddTestimonial() : handleEditTestimonial()}
                                className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700"
                            >
                                {testimonialMode}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Compact Metrics */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
                    <div>
                        <p className="text-xs text-gray-600 mb-1">Total Testimonials</p>
                        <p className="text-2xl font-bold text-gray-900">{totalTestimonials}</p>
                    </div>
                    <div className="hidden sm:block h-12 w-px bg-gray-200" />
                    <div>
                        <p className="text-xs text-gray-600 mb-1">Last Upload</p>
                        <p className="text-lg font-semibold text-gray-900">{lastUploadDate}</p>
                    </div>
                </div>
            </div>

            {/* Videos List */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-lime-600" />
                    Testimonials
                </h3>
                <div className="space-y-3">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-sm flex-wrap"
                        >

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col justify-start mb-3">
                                    <div className="flex">
                                        <div className="w-[100px]">
                                            {testimonial.author_picture_url ? (
                                                <img src={testimonial.author_picture_url} alt="" />
                                            ) : (
                                                <div className="w-23 h-23 rounded-full bg-lime-100 border-2 border-lime-200 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user w-16 h-16 text-lime-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-lg">
                                                {testimonial.author_name}
                                            </h3>
                                            <span className="flex items-center gap-1 mb-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                            <div className="flex">
                                                {Array.from({ length: testimonial.stars_number }, (_, index) => (
                                                    <Star className="w-5 h-5 text-yellow-400 fill-current" key={index} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <p className="text-sm text-gray-600 mb-3">
                                        {testimonial.testimonial_description}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}

                            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                                <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                                    <DialogHeader>
                                        <DialogTitle>Delete Testimonial</DialogTitle>
                                        <DialogDescription>
                                            Do you want to delete this testimonial?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDeleteTestimonial(testimonialID)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Delete
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <div className="order-last w-full sm:order-none sm:w-auto flex flex-row sm:flex-col gap-2 mt-2 sm:mt-0 sm:ml-auto">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                    onClick={() => { handleEditTestimonialData(testimonial); setTestimonialMode("Update Testimonial") }}
                                >
                                    <Edit className="w-4 h-4 mr-5" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => {setShowDeleteModal(true); setTestimonialID(testimonial.id)}}
                                >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}

                    {testimonials.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium mb-2">
                                No testimonials yet
                            </h3>
                            <p className="text-sm">Get started by adding your first testimonial.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
