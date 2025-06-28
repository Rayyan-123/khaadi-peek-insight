
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  replies: Comment[];
}

interface ProductCommentsProps {
  productId: string;
}

export const ProductComments = ({ productId }: ProductCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Ahmed",
      content: "Beautiful quality fabric! Really happy with my purchase.",
      timestamp: new Date("2024-01-15"),
      replies: [
        {
          id: "1-1",
          author: "KK-Clothing",
          content: "Thank you for your feedback! We're glad you love it.",
          timestamp: new Date("2024-01-16"),
          replies: []
        }
      ]
    }
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      content: newComment,
      timestamp: new Date(),
      replies: []
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment("");
  };

  const handleAddReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    
    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: "You",
      content: replyContent,
      timestamp: new Date(),
      replies: []
    };
    
    setComments(prev => prev.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    
    setReplyContent("");
    setReplyTo(null);
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-8 mt-4' : 'mb-6'}`}>
      <div className="flex items-start space-x-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback>{comment.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm">{comment.author}</span>
            <span className="text-xs text-gray-500">
              {comment.timestamp.toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
          {!isReply && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs mt-2"
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
            >
              Reply
            </Button>
          )}
          
          {replyTo === comment.id && (
            <div className="mt-3 flex space-x-2">
              <Input
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="text-sm"
              />
              <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                Reply
              </Button>
            </div>
          )}
          
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Customer Reviews ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-6">
          <Input
            placeholder="Share your thoughts about this product..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment}>Post</Button>
        </div>
        
        <div>
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
