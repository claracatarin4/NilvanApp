// import { Camera } from "lucide-react-native"
// import Image from "next/image"//

// export default function ImageUpload({ image, onImageSelect }) {
//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         onImageSelect(reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

// //   return (
// //     <div className="flex items-center justify-center py-6 bg-white">
// //       <label className="relative w-[120px] h-[120px] rounded-lg overflow-hidden cursor-pointer">
// //         <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
// //         {image ? (
// //           <Image src={image || "/placeholder.svg"} alt="Product" fill className="object-cover" />
// //         ) : (
// //           <div className="flex items-center justify-center w-full h-full bg-[#d3d3d3]">
// //             <Camera size={40} className="text-gray-600" />
// //           </div>
// //         )}
// //       </label>
// //     </div>
// //   )
// // }
