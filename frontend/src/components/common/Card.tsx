export default function Card() {
  return (
    <div id="card">
      <div>
        <label>Name your post</label>
        <input
          name="title"
          type="text"
          placeholder="Finally! Content as empty as..."
        />
      </div>
      <div>
        <label>Content</label>
        <input
          name="title"
          type="text"
          placeholder="These arguments are so pointless...even the bots are participating!"
        />
      </div>
      <button type="submit">Submit</button>
    </div>
  );
}
