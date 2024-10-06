import React, { useState } from 'react'
import MindMap from './components/MindMap'
import { TreeNodeType } from './types'

function App() {
  const [tree, setTree] = useState<TreeNodeType>({
    id: '1',
    content: 'Root',
    children: [],
    x: 400,
    y: 100,
  })

  const handleAddChild = (parentId: string) => {
    const newNode: TreeNodeType = {
      id: Date.now().toString(),
      content: 'New Node',
      children: [],
      x: 0,
      y: 0,
    }

    const addChildToNode = (node: TreeNodeType): TreeNodeType => {
      if (node.id === parentId) {
        const lastChild = node.children[node.children.length - 1]
        newNode.x = node.x + 200
        newNode.y = lastChild ? lastChild.y + 100 : node.y
        return { ...node, children: [...node.children, newNode] }
      }
      return {
        ...node,
        children: node.children.map(addChildToNode),
      }
    }

    setTree(addChildToNode(tree))
  }

  const handleEditContent = (id: string, newContent: string) => {
    const editNodeContent = (node: TreeNodeType): TreeNodeType => {
      if (node.id === id) {
        return { ...node, content: newContent }
      }
      return {
        ...node,
        children: node.children.map(editNodeContent),
      }
    }

    setTree(editNodeContent(tree))
  }

  const handleNodeMove = (id: string, x: number, y: number) => {
    const moveNode = (node: TreeNodeType): TreeNodeType => {
      if (node.id === id) {
        return { ...node, x, y }
      }
      return {
        ...node,
        children: node.children.map(moveNode),
      }
    }

    setTree(moveNode(tree))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Mind Map Editor</h1>
      <div className="w-full h-[calc(100vh-120px)] bg-white rounded-lg shadow-lg overflow-hidden">
        <MindMap
          tree={tree}
          onAddChild={handleAddChild}
          onEditContent={handleEditContent}
          onNodeMove={handleNodeMove}
        />
      </div>
    </div>
  )
}

export default App