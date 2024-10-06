import React, { useState } from 'react'
import { TreeNodeType } from '../types'
import { ChevronDown, ChevronRight, Plus, Edit2 } from 'lucide-react'

interface TreeNodeProps {
  node: TreeNodeType
  onAddChild: (parentId: string) => void
  onEditContent: (id: string, newContent: string) => void
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onAddChild, onEditContent }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(node.content)

  const handleToggle = () => setIsExpanded(!isExpanded)

  const handleAddChild = () => onAddChild(node.id)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleEditSave = () => {
    onEditContent(node.id, editedContent)
    setIsEditing(false)
  }

  return (
    <div className="ml-4">
      <div className="flex items-center mb-2">
        {node.children.length > 0 && (
          <button onClick={handleToggle} className="mr-2 text-gray-500 hover:text-gray-700">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
        )}
        {isEditing ? (
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onBlur={handleEditSave}
            autoFocus
            className="border rounded px-2 py-1 mr-2"
          />
        ) : (
          <span className="font-medium text-gray-800">{node.content}</span>
        )}
        <button
          onClick={handleAddChild}
          className="ml-2 p-1 text-green-600 hover:text-green-800"
          title="Add child"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={handleEditClick}
          className="ml-2 p-1 text-blue-600 hover:text-blue-800"
          title="Edit"
        >
          <Edit2 size={16} />
        </button>
      </div>
      {isExpanded && node.children.length > 0 && (
        <div className="pl-4 border-l border-gray-300">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onAddChild={onAddChild}
              onEditContent={onEditContent}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeNode