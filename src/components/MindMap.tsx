import React from 'react'
import MindMapNode from './MindMapNode'
import Xarrow from 'react-xarrows'
import { TreeNodeType } from '../types'

interface MindMapProps {
  tree: TreeNodeType
  onAddChild: (parentId: string) => void
  onEditContent: (id: string, newContent: string) => void
  onNodeMove: (id: string, x: number, y: number) => void
}

const MindMap: React.FC<MindMapProps> = ({ tree, onAddChild, onEditContent, onNodeMove }) => {
  const renderNode = (node: TreeNodeType) => (
    <React.Fragment key={node.id}>
      <MindMapNode
        node={node}
        onAddChild={onAddChild}
        onEditContent={onEditContent}
        onNodeMove={onNodeMove}
      />
      {node.children.map((child) => (
        <Xarrow
          key={`${node.id}-${child.id}`}
          start={node.id}
          end={child.id}
          color="#718096"
          strokeWidth={2}
          path="straight"
        />
      ))}
      {node.children.map(renderNode)}
    </React.Fragment>
  )

  return (
    <div className="w-full h-full relative">
      {renderNode(tree)}
    </div>
  )
}

export default MindMap