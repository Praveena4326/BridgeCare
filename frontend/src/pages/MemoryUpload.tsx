import { useState } from "react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Modal } from "../components/ui/Modal"
import { Plus, Image as ImageIcon, Calendar } from "lucide-react"
import { api } from "../services/api"

interface Memory {
    id: number
    title: string
    date: string
    content: string
    image?: string
}

export function MemoryUpload() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [memories, setMemories] = useState<Memory[]>([
        {
            id: 1,
            title: "Summer at the Lake",
            date: "1985-07-15",
            content: "The whole family gathered for a picnic. It was a beautiful sunny day.",
            image: "https://images.unsplash.com/photo-1516475429286-465d815a0df7?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Martha's 60th Birthday",
            date: "2010-03-22",
            content: "A surprise party with all the grandchildren.",
        }
    ])

    const [newMemory, setNewMemory] = useState<Partial<Memory>>({})

    const handleSave = async () => {
        if (newMemory.title && newMemory.content) {
            try {
                const result = await api.uploadMemory({
                    title: newMemory.title,
                    date: newMemory.date || new Date().toISOString().split('T')[0],
                    content: newMemory.content,
                    image: newMemory.image
                });

                setMemories([result.memory, ...memories])
                setNewMemory({})
                setIsModalOpen(false)
            } catch (error) {
                console.error("Failed to upload memory", error)
                // Optionally show an error toast
            }
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-neutral-50 py-12 px-4 md:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900">Digital Memory Box</h1>
                        <p className="mt-2 text-neutral-600">Preserve cherish moments for Martha to revisit.</p>
                    </div>
                    <Button onClick={() => setIsModalOpen(true)} size="lg">
                        <Plus className="mr-2 h-5 w-5" />
                        Add Memory
                    </Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {memories.map((memory) => (
                        <Card key={memory.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            {memory.image && (
                                <div className="relative h-48 w-full">
                                    <img
                                        src={memory.image}
                                        alt={memory.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        {memory.date}
                                    </span>
                                </div>
                                <CardTitle>{memory.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-neutral-600 line-clamp-3">{memory.content}</p>
                                <Button variant="ghost" className="mt-4 w-full text-primary-600 hover:text-primary-700 hover:bg-primary-50">
                                    Read Full Story
                                </Button>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Add New Placeholer */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group flex h-full min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-300 bg-white p-6 transition-all hover:border-primary-500 hover:bg-primary-50"
                    >
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 group-hover:bg-primary-100">
                            <Plus className="h-8 w-8 text-neutral-400 group-hover:text-primary-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700">Add New Memory</h3>
                        <p className="mt-2 text-center text-sm text-neutral-500">Upload photos or write a story</p>
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Memory">
                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">Title</label>
                        <Input
                            placeholder="e.g., Summer Vacation 1990"
                            value={newMemory.title || ""}
                            onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">Date</label>
                        <Input
                            type="date"
                            value={newMemory.date || ""}
                            onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">Story</label>
                        <textarea
                            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 min-h-[150px]"
                            placeholder="Write the memory details here..."
                            value={newMemory.content || ""}
                            onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700">Photo URL (Optional)</label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="https://..."
                                value={newMemory.image || ""}
                                onChange={(e) => setNewMemory({ ...newMemory, image: e.target.value })}
                            />
                            <Button variant="outline" size="icon" className="shrink-0">
                                <ImageIcon className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} disabled={!newMemory.title || !newMemory.content}>Save Memory</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
