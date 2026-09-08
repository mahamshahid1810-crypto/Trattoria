const galleryImages = [
  {
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85",
    title: "Fresh Ingredients",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85",
    title: "Our Dining Room",
  },
  {
    image:
      "https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=1000&q=85",
    title: "Italian Pizza",
  },
  {
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85",
    title: "Handmade Pasta",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1000&q=85",
    title: "Chef's Kitchen",
  },
  {
    image:
      "https://images.unsplash.com/photo-1498579397066-22750a3cb424?auto=format&fit=crop&w=1000&q=85",
    title: "Italian Evening",
  },
];

function Gallery() {
  return (
    <section className="gallery section" id="gallery">
      <div className="section-heading">
        <p className="section-label">OUR GALLERY</p>

        <h2>
          A taste of
          <br />
          <span>Trattoria.</span>
        </h2>

        <p>
          Take a glimpse into our kitchen, our dishes and the
          atmosphere that makes Trattoria special.
        </p>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((item, index) => (
          <div className={`gallery-item gallery-${index + 1}`} key={item.title}>
            <img src={item.image} alt={item.title} />

            <div className="gallery-overlay">
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;