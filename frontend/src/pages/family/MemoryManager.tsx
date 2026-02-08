import { useEffect, useState } from "react"
import { api, type Memory } from "../../services/api"
import { Button } from "../../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Trash2, Edit2, Plus, Save, X } from "lucide-react"

export function MemoryManager() {
    const [memories, setMemories] = useState<Memory[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<number | string | null>(null)
    const [editForm, setEditForm] = useState<Partial<Memory>>({})
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        loadMemories()
    }, [])

    const loadMemories = async () => {
        try {
            const data = await api.getMemories("elder-001")
            setMemories(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number | string) => {
        if (!confirm("Are you sure you want to delete this memory?")) return
        try {
            await api.deleteMemory(id)
            setMemories(memories.filter(m => m.id !== id))
        } catch (err) {
            alert("Failed to delete memory")
        }
    }

    const startEdit = (memory: Memory) => {
        setEditingId(memory.id)
        setEditForm(memory)
        setIsCreating(false)
    }

    const handleSave = async () => {
        try {
            if (isCreating) {
                const res = await api.uploadMemory(editForm)
                setMemories([res.memory, ...memories])
            } else if (editingId) {
                const res = await api.updateMemory(editingId, editForm)
                setMemories(memories.map(m => m.id === editingId ? res.memory : m))
            }
            setEditingId(null)
            setIsCreating(false)
            setEditForm({})
        } catch (err) {
            alert("Failed to save memory")
        }
    }

    const handleCancel = () => {
        setEditingId(null)
        setIsCreating(false)
        setEditForm({})
    }

    if (loading) return <div>Loading memories...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-neutral-900">Memory Management</h2>
                <Button onClick={() => { setIsCreating(true); setEditForm({}); setEditingId('new') }}>
                    <Plus className="mr-2 h-4 w-4" /> Add Memory
                </Button>
            </div>

            {(isCreating || editingId) && (
                <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                        <CardTitle>{isCreating ? "New Memory" : "Edit Memory"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <input
                            className="w-full p-2 border rounded"
                            placeholder="Title (e.g., Favorite Flower)"
                            value={editForm.title || ''} // Use title as primary label
                            onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                        />
                        <textarea
                            className="w-full p-2 border rounded"
                            placeholder="Content (e.g., The user loves red roses.)"
                            value={editForm.content || editForm.text || ''} // Handle both fields
                            onChange={e => setEditForm({ ...editForm, content: e.target.value })}
                        />
                        <div className="flex space-x-2">
                            <Button onClick={handleSave} size="sm"><Save className="mr-2 h-4 w-4" /> Save</Button>
                            <Button onClick={handleCancel} variant="ghost" size="sm"><X className="mr-2 h-4 w-4" /> Cancel</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {memories.map(memory => (
                    <Card key={memory.id}>
                        <CardContent className="flex items-center justify-between p-4">
                            <div>
                                <h3 className="font-bold text-lg">{memory.title || "Untitled Memory"}</h3>
                                <p className="text-neutral-600">{memory.content || memory.text}</p>
                                <span className="text-xs text-neutral-400">{memory.date || "No date"}</span>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => startEdit(memory)}>
                                    <Edit2 className="h-4 w-4 text-blue-600" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(memory.id)}>
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
