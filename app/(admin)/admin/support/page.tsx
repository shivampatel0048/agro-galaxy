"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LoadingUI from '@/components/loaders/LoadingUI'
import { formatDate } from '@/lib/utils'
import { Badge } from "@/components/ui/badge"
import { Search, LayoutGrid, Table as TableIcon } from 'lucide-react'
import { getAllContacts } from '@/redux/apis/contact'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface ContactMessage {
    _id: string
    name: string
    email: string
    subject: string
    message: string
    createdAt: string
    updatedAt: string
}

const Page = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('newest')
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getAllContacts()
                setMessages(data)
            } catch (error) {
                console.error("Failed to fetch messages:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchMessages()
    }, [])

    const filteredAndSortedMessages = messages
        .filter(message =>
            message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.message.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        })

    if (loading) return <LoadingUI />

    const renderGridView = () => (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredAndSortedMessages.map((message) => (
                <Card key={message._id} className="flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader className="flex-1 space-y-3">
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-semibold line-clamp-1">{message.name}</CardTitle>
                                <CardDescription>
                                    <a href={`mailto:${message.email}`} className="text-blue-600 text-sm hover:underline break-all">
                                        {message.email}
                                    </a>
                                </CardDescription>
                            </div>
                            <Badge variant="secondary" className="whitespace-nowrap">
                                {formatDate(new Date(message.createdAt))}
                            </Badge>
                        </div>
                        <Badge className="w-fit" variant="outline">{message.subject}</Badge>
                    </CardHeader>
                    <CardContent className="pt-4 border-t">
                        <p className="text-sm text-gray-600 line-clamp-3">{message.message}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const renderTableView = () => (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAndSortedMessages.map((message) => (
                        <TableRow key={message._id}>
                            <TableCell className="font-medium">{message.name}</TableCell>
                            <TableCell>
                                <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">
                                    {message.email}
                                </a>
                            </TableCell>
                            <TableCell>{message.subject}</TableCell>
                            <TableCell className="max-w-[300px]">
                                <p className="truncate">{message.message}</p>
                            </TableCell>
                            <TableCell>{formatDate(new Date(message.createdAt))}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-3xl font-bold">Support Messages</h1>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
                            className="shrink-0"
                        >
                            {viewMode === 'grid' ? <TableIcon size={18} /> : <LayoutGrid size={18} />}
                        </Button>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest First</SelectItem>
                                <SelectItem value="oldest">Oldest First</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {filteredAndSortedMessages.length > 0 ? (
                    viewMode === 'grid' ? renderGridView() : renderTableView()
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No messages found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page