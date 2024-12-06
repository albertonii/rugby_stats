import { useParams, Link } from "react-router-dom";
import {
  GlobeAltIcon,
  UserGroupIcon,
  BookOpenIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { clubs } from "../data/clubs";
import { teams } from "../data/teams";
import { players } from "../data/players";

const ClubDetails = () => {
  const { clubId } = useParams();
  const club = clubs.find((c) => c.id === Number(clubId));
  const clubTeams = teams.filter((t) => t.clubId === Number(clubId));
  const clubPlayers = players.filter((p) => p.clubId === Number(clubId));

  if (!club) return <div>Club no encontrado</div>;

  const teamsByCategory = clubTeams.reduce((acc, team) => {
    if (!acc[team.category]) {
      acc[team.category] = [];
    }
    acc[team.category].push(team);
    return acc;
  }, {} as Record<string, typeof teams>);

  return (
    <div className="space-y-6">
      {/* Club Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{club.name}</h1>
            <p className="text-gray-500">
              {club.city}, {club.island}
            </p>
          </div>
          {club.logo && (
            <img
              src={club.logo}
              alt={`${club.name} logo`}
              className="h-24 w-24 object-contain"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <GlobeAltIcon className="h-5 w-5 mr-2 text-blue-600" />
              Información General
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>Fundado en: {club.foundedYear}</p>
              <p>Campo Principal: {club.mainField}</p>
              {club.website && (
                <p>
                  Web:{" "}
                  <a
                    href={`https://${club.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800">
                    {club.website}
                  </a>
                </p>
              )}
              {club.socialMedia && (
                <div className="space-y-1">
                  {club.socialMedia.instagram && (
                    <p>
                      Instagram:{" "}
                      <a
                        href={`https://instagram.com/${club.socialMedia.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800">
                        {club.socialMedia.instagram}
                      </a>
                    </p>
                  )}
                  {club.socialMedia.facebook && (
                    <p>
                      Facebook:{" "}
                      <a
                        href={`https://facebook.com/${club.socialMedia.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800">
                        {club.socialMedia.facebook}
                      </a>
                    </p>
                  )}
                  {club.socialMedia.tiktok && (
                    <p>
                      TikTok:{" "}
                      <a
                        href={`https://tiktok.com/${club.socialMedia.tiktok}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800">
                        {club.socialMedia.tiktok}
                      </a>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <UserGroupIcon className="h-5 w-5 mr-2 text-green-600" />
              Estadísticas
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>Equipos: {clubTeams.length}</p>
              <p>Jugadores: {clubPlayers.length}</p>
              <p>Categorías: {Object.keys(teamsByCategory).length}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6 border-t pt-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <EnvelopeIcon className="h-5 w-5 mr-2 text-indigo-600" />
            Contacto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                <a
                  href={`mailto:${club.contact.email}`}
                  className="text-blue-600 hover:text-blue-800">
                  {club.contact.email}
                </a>
              </p>
              {club.contact.phone && (
                <p className="flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  <a
                    href={`tel:${club.contact.phone}`}
                    className="text-blue-600 hover:text-blue-800">
                    {club.contact.phone}
                  </a>
                </p>
              )}
              <p className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-2" />
                {club.contact.address}
              </p>
            </div>
          </div>
        </div>

        {/* Board Members */}
        <div className="mt-6 border-t pt-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <UsersIcon className="h-5 w-5 mr-2 text-purple-600" />
            Junta Directiva
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {club.boardMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold">{member.position}</p>
                <p className="text-gray-600">{member.name}</p>
                {member.email && (
                  <p className="text-sm">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-blue-600 hover:text-blue-800">
                      {member.email}
                    </a>
                  </p>
                )}
                <p className="text-sm text-gray-500">Desde {member.since}</p>
              </div>
            ))}
          </div>
        </div>

        {club.history && (
          <div className="mt-6 border-t pt-6">
            <h3 className="font-semibold mb-2 flex items-center">
              <BookOpenIcon className="h-5 w-5 mr-2 text-purple-600" />
              Historia
            </h3>
            <p className="text-gray-600 whitespace-pre-line">{club.history}</p>
          </div>
        )}
      </div>

      {/* Teams Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Equipos</h2>
        {Object.entries(teamsByCategory).map(([category, categoryTeams]) => (
          <div key={category} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTeams.map((team) => (
                <Link
                  key={team.id}
                  to={`/teams/${team.id}`}
                  className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{team.name}</h4>
                    <div className="text-sm text-gray-500">
                      <p>Temporada: {team.season}</p>
                      <p>Campo: {team.homeField}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          team.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {team.status === "active" ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubDetails;
