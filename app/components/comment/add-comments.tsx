"use client";

export default function AddComment({ id }: { id: string }) {
  async function addComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {
      title: formData.get("comment") as string,
      id: id,
    };
    console.log(body.id);
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={addComment}>
      <input
        placeholder="add a comment"
        name="comment"
        className="w-full max-w-xs textarea textarea-bordered textarea-lg"
      />
    </form>
  );
}
