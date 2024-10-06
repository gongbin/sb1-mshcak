import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { TreeNodeType } from '../types'
import { Plus, Edit2 } from 'lucide-react'

interface MindMapNodeProps {
  node: TreeNodeType
  onAddChild: (parentId: string) => void
  onEditContent: (id: string, newContent: string) => void
  onNodeMove: (id: string, x: number, y: number) => void
}

const MindMapNode: React.FC<MindMapNodeProps> = ({ node, onAddChild, onEditContent, onNodeMove }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(node.content)

  const handleAddChild = () => onAddChild(node.id)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleEditSave = () => {
    onEditContent(node.id, editedContent)
    setIsEditing(false)
  }

  const handleDrag = (_e: any, data: { x: number; y: number }) => {
    onNodeMove(node.id, data.x, data.y)
  }

  return (
    <Draggable
      position={{ x: node.x, y: node.y }}
      onDrag={handleDrag}
      bounds="parent"
    >
      <div
        id={node.id}
        className="absolute bg-white border-2 border-gray-300 rounded-lg p-2 shadow-md cursor-move"
        style={{ width: '150px' }}
      >
        {isEditing ? (
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onBlur={handleEditSave}
            autoFocus
            className="w-full border rounded px-2 py-1 mb-2"
          />
        ) : (
          <div className="font-medium text-gray-800 mb-2">{node.content}</div>
        )}
        <div className="flex justify-end">
          <button
            onClick={handleAddChild}
            className="mr-2 p-1 text-green-600 hover:text-green-800"
            title="Add child"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={handleEditClick}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
        </div>
      </div>
    </Draggable>
  )
}

export default MindMapNode